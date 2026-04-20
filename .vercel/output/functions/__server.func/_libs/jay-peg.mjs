import { S as Struct, g as BufferT, A as ArrayT, m as uint16be, R as Reserved, b as uint8, e as StringT, n as uint32be, o as uint32le, p as uint16le, V as VersionedStruct } from "./restructure.mjs";
const DACTable = new Struct({
  identifier: new BufferT(1),
  value: new BufferT(1)
});
const DACMarker = {
  name: () => "DAC",
  length: uint16be,
  tables: new ArrayT(DACTable, (parent) => parent.length / 2)
};
const readUInt8 = (array, offset) => {
  return array[offset];
};
const readUInt16BE = (array, offset) => {
  return array[offset] << 8 | array[offset + 1];
};
const readUInt16LE = (array, offset) => {
  return array[offset] | array[offset + 1] << 8;
};
const readUInt32BE = (array, offset) => {
  return readInt32BE(array, offset) >>> 0;
};
const readUInt32LE = (array, offset) => {
  return readInt32LE(array, offset) >>> 0;
};
const uint8ArrayToHexString = (uint8Array) => {
  return Array.from(
    uint8Array,
    (byte) => byte.toString(16).padStart(2, "0")
  ).join("");
};
const decoder = new TextDecoder("utf-8");
const uint8ArrayToString = (uint8Array) => {
  return decoder.decode(uint8Array);
};
const concatenateUint8Arrays = (arrays) => {
  const totalLength = arrays.reduce((length, arr) => length + arr.length, 0);
  const concatenatedArray = new Uint8Array(totalLength);
  let offset = 0;
  arrays.forEach((arr) => {
    concatenatedArray.set(arr, offset);
    offset += arr.length;
  });
  return concatenatedArray;
};
const readInt32BE = (array, offset) => {
  return array[offset] << 24 | array[offset + 1] << 16 | array[offset + 2] << 8 | array[offset + 3];
};
const readInt32LE = (array, offset) => {
  return array[offset] | array[offset + 1] << 8 | array[offset + 2] << 16 | array[offset + 3] << 24;
};
class HuffmanTableElements {
  decode(stream, parent) {
    const tables = {};
    let buffer = stream.buffer.slice(
      stream.pos,
      stream.pos + parent.length - 2
    );
    while (buffer.length > 0) {
      let offset = 1;
      const elements = [];
      const identifier = readUInt8(buffer, 0);
      const lengths = buffer.slice(offset, offset + 16);
      offset += 16;
      for (const length of lengths) {
        elements.push(buffer.slice(offset, offset + length));
        offset += length;
      }
      buffer = buffer.slice(offset);
      tables[identifier] = concatenateUint8Arrays(elements);
    }
    stream.pos += parent.length - 2;
    return tables;
  }
}
const DefineHuffmanTableMarker = {
  name: () => "DHT",
  length: uint16be,
  tables: new HuffmanTableElements()
};
const DQTMarker = {
  name: () => "DQT",
  length: uint16be,
  tables: new ArrayT(
    new Struct({
      identifier: new BufferT(1),
      data: new BufferT(64)
    }),
    (parent) => (parent.length - 2) / 65
  )
};
const DRIMarker = {
  name: () => "DRI",
  length: uint16be,
  restartInterval: uint16be
};
const EndOfImageMarker = {
  name: () => "EOI",
  afterEOI: new Reserved(uint8, Infinity)
};
const tags = {
  ifd: {
    "010e": "imageDescription",
    "010f": "make",
    "011a": "xResolution",
    "011b": "yResolution",
    "011c": "planarConfiguration",
    "012d": "transferFunction",
    "013b": "artist",
    "013e": "whitePoint",
    "013f": "primaryChromaticities",
    "0100": "imageWidth",
    "0101": "imageHeight",
    "0102": "bitsPerSample",
    "0103": "compression",
    "0106": "photometricInterpretation",
    "0110": "model",
    "0111": "stripOffsets",
    "0112": "orientation",
    "0115": "samplesPerPixel",
    "0116": "rowsPerStrip",
    "0117": "stripByteCounts",
    "0128": "resolutionUnit",
    "0131": "software",
    "0132": "dateTime",
    "0201": "jpegInterchangeFormat",
    "0202": "jpegInterchangeFormatLength",
    "0211": "ycbCrCoefficients",
    "0212": "ycbCrSubSampling",
    "0213": "ycbCrPositioning",
    "0214": "referenceBlackWhite",
    "829a": "exposureTime",
    "829d": "fNumber",
    "920a": "focalLength",
    "927c": "makerNote",
    8298: "copyright",
    8769: "exifIFDPointer",
    8822: "exposureProgram",
    8824: "spectralSensitivity",
    8825: "gpsInfoIFDPointer",
    8827: "photographicSensitivity",
    8828: "oecf",
    8830: "sensitivityType",
    8831: "standardOutputSensitivity",
    8832: "recommendedExposureIndex",
    8833: "isoSpeed",
    8834: "isoSpeedLatitudeyyy",
    8835: "isoSpeedLatitudezzz",
    9e3: "exifVersion",
    9003: "dateTimeOriginal",
    9004: "dateTimeDigitized",
    9101: "componentsConfiguration",
    9102: "compressedBitsPerPixel",
    9201: "shutterSpeedValue",
    9202: "apertureValue",
    9203: "brightnessValue",
    9204: "exposureBiasValue",
    9205: "maxApertureValue",
    9206: "subjectDistance",
    9207: "meteringMode",
    9208: "lightSource",
    9209: "flash",
    9214: "subjectArea",
    9286: "userComment",
    9290: "subSecTime",
    9291: "subSecTimeOriginal",
    9292: "subSecTimeDigitized",
    a000: "flashpixVersion",
    a001: "colorSpace",
    a002: "pixelXDimension",
    a003: "pixelYDimension",
    a004: "relatedSoundFile",
    a005: "interoperabilityIFDPointer",
    a20b: "flashEnergy",
    a20c: "spatialFrequencyResponse",
    a20e: "focalPlaneXResolution",
    a20f: "focalPlaneYResolution",
    a40a: "sharpness",
    a40b: "deviceSettingDescription",
    a40c: "subjectDistanceRange",
    a210: "focalPlaneResolutionUnit",
    a214: "subjectLocation",
    a215: "exposureIndex",
    a217: "sensingMethod",
    a300: "fileSource",
    a301: "sceneType",
    a302: "cfaPattern",
    a401: "customRendered",
    a402: "exposureMode",
    a403: "whiteBalance",
    a404: "digitalZoomRatio",
    a405: "focalLengthIn35mmFilm",
    a406: "sceneCaptureType",
    a407: "gainControl",
    a408: "contrast",
    a409: "saturation",
    a420: "imageUniqueID",
    a430: "cameraOwnerName",
    a431: "bodySerialNumber",
    a432: "lensSpecification",
    a433: "lensMake",
    a434: "lensModel",
    a435: "lensSerialNumber",
    a500: "gamma"
  },
  gps: {
    "0000": "gpsVersionID",
    "0001": "gpsLatitudeRef",
    "0002": "gpsLatitude",
    "0003": "gpsLongitudeRef",
    "0004": "gpsLongitude",
    "0005": "gpsAltitudeRef",
    "0006": "gpsAltitude",
    "0007": "gpsTimeStamp",
    "0008": "gpsSatellites",
    "0009": "gpsStatus",
    "000a": "gpsMeasureMode",
    "000b": "gpsDOP",
    "000c": "gpsSpeedRef",
    "000d": "gpsSpeed",
    "000e": "gpsTrackRef",
    "000f": "gpsTrack",
    "0010": "gpsImgDirectionRef",
    "0011": "gpsImgDirection",
    "0012": "gpsMapDatum",
    "0013": "gpsDestLatitudeRef",
    "0014": "gpsDestLatitude",
    "0015": "gpsDestLongitudeRef",
    "0016": "gpsDestLongitude",
    "0017": "gpsDestBearingRef",
    "0018": "gpsDestBearing",
    "0019": "gpsDestDistanceRef",
    "001a": "gpsDestDistance",
    "001b": "gpsProcessingMethod",
    "001c": "gpsAreaInformation",
    "001d": "gpsDateStamp",
    "001e": "gpsDifferential",
    "001f": "gpsHPositioningError"
  }
};
class IDFEntries {
  constructor(bigEndian) {
    this.bigEndian = bigEndian;
    this.bytes = [0, 1, 1, 2, 4, 8, 1, 1, 2, 4, 8, 4, 8];
  }
  _getTagValue(dataValue, dataFormat, componentsNumber) {
    switch (dataFormat) {
      case 2:
        return dataValue.toString("ascii").replace(/\0+$/, "");
      case 129:
        return dataValue.toString("utf8").replace(/\0+$/, "");
      case 7:
        return "0x" + dataValue.toString("hex");
      default:
        return this._getTagValueForNumericalData(dataValue, dataFormat, componentsNumber);
    }
  }
  _getTagValueForNumericalData(dataValue, dataFormat, componentsNumber) {
    const tagValue = [];
    const componentsBytes = this.bytes[dataFormat];
    for (let i = 0; i < componentsNumber; i += 1) {
      tagValue.push(this._getSingleTagValueForNumericalData(dataValue, dataFormat, i * componentsBytes));
    }
    return tagValue.length === 1 ? tagValue[0] : tagValue;
  }
  _getSingleTagValueForNumericalData(dataValue, dataFormat, pos) {
    const uint16 = (pos2) => this.bigEndian ? readUInt16BE(dataValue, pos2) : readUInt16LE(dataValue, pos2);
    const uint32 = (pos2) => this.bigEndian ? readUInt32BE(dataValue, pos2) : readUInt32LE(dataValue, pos2);
    const int32 = (pos2) => this.bigEndian ? readInt32BE(dataValue, pos2) : readInt32LE(dataValue, pos2);
    switch (dataFormat) {
      case 1:
        return readUInt8(dataValue, pos);
      case 3:
        return uint16(pos);
      case 4:
        return uint32(pos);
      case 5:
        return uint32(pos) / uint32(pos + 4);
      case 9:
        return int32(pos);
      case 10: {
        return int32(pos) / int32(pos + 4);
      }
    }
  }
  _decodeIDFEntries(buffer, tags2, offset, log = false) {
    let pos = 2 + offset;
    const entries = {};
    const uint16 = (pos2) => this.bigEndian ? readUInt16BE(buffer, pos2) : readUInt16LE(buffer, pos2);
    const uint32 = (pos2) => this.bigEndian ? readUInt32BE(buffer, pos2) : readUInt32LE(buffer, pos2);
    const numberOfEntries = uint16(offset);
    for (let i = 0; i < numberOfEntries; i++) {
      const tagAddress = buffer.slice(pos, pos + 2);
      const dataFormat = uint16(pos + 2);
      const componentsNumber = uint32(pos + 4);
      const componentsBytes = this.bytes[dataFormat];
      const dataLength = componentsNumber * componentsBytes;
      let dataValue = buffer.slice(pos + 8, pos + 12);
      if (dataLength > 4) {
        const dataOffset = this.bigEndian ? readUInt32BE(dataValue, 0) : readUInt32LE(dataValue, 0);
        dataValue = buffer.slice(dataOffset, dataOffset + dataLength);
      }
      const tagValue = this._getTagValue(dataValue, dataFormat, componentsNumber);
      const tagNumber = this.bigEndian ? uint8ArrayToHexString(tagAddress) : uint8ArrayToHexString(tagAddress.reverse());
      const tagName = tags2[tagNumber];
      entries[tagName] = tagValue;
      pos += 12;
    }
    return entries;
  }
  decode(stream, parent) {
    const buffer = stream.buffer.slice(stream.pos - 8);
    const offsetToFirstIFD = parent.offsetToFirstIFD;
    if (offsetToFirstIFD > buffer.length) {
      stream.pos += parent.parent.length - 16;
      return {};
    }
    const entries = this._decodeIDFEntries(buffer, tags.ifd, offsetToFirstIFD);
    const { exifIFDPointer, gpsInfoIFDPointer } = entries;
    if (exifIFDPointer) {
      entries.subExif = this._decodeIDFEntries(
        buffer,
        tags.ifd,
        exifIFDPointer
      );
    }
    if (gpsInfoIFDPointer) {
      const gps = gpsInfoIFDPointer;
      entries.gpsInfo = this._decodeIDFEntries(buffer, tags.gps, gps, true);
    }
    stream.pos += parent.parent.length - 16;
    return entries;
  }
}
const IFDData = (bigEndian) => {
  const uint16 = bigEndian ? uint16be : uint16le;
  const uint32 = bigEndian ? uint32be : uint32le;
  return new Struct({
    fortyTwo: uint16,
    offsetToFirstIFD: uint32,
    entries: new IDFEntries(bigEndian)
  });
};
class TIFFHeader {
  decode(stream, parent) {
    const byteOrder = uint8ArrayToString(
      stream.buffer.slice(stream.pos, stream.pos + 2)
    );
    const bigEndian = byteOrder === "MM";
    stream.pos += 2;
    const data = IFDData(bigEndian).decode(stream, parent);
    return data.entries;
  }
}
const EXIFMarker = {
  name: () => "EXIF",
  length: uint16be,
  identifier: new StringT(6),
  entries: new TIFFHeader()
};
const JFIFMarker = {
  name: () => "JFIF",
  length: uint16be,
  identifier: new StringT(5),
  version: uint16be,
  units: uint8,
  xDensity: uint16be,
  yDensity: uint16be,
  thumbnailWidth: uint8,
  thumbnailHeight: uint8
};
class ImageData {
  decode(stream) {
    const buffer = stream.buffer.slice(stream.pos);
    let length = 0;
    let i = buffer.indexOf(255);
    while (i !== -1) {
      length = i;
      const nextByte = buffer[length + 1];
      const comesRestart = nextByte >= 208 && nextByte <= 215;
      if (nextByte !== 0 && !comesRestart) break;
      i = buffer.indexOf(255, i + 1);
    }
    stream.pos += length;
    return buffer.slice(0, length);
  }
}
const SOSComponentSpecification = new Struct({
  scanComponentSelector: uint8,
  entropyCodingTable: new BufferT(1)
});
const SOSMarker = {
  name: () => "SOS",
  length: uint16be,
  numberOfImageComponents: uint8,
  componentSpecifications: new ArrayT(
    SOSComponentSpecification,
    (parent) => parent.numberOfImageComponents
  ),
  startOfSpectral: uint8,
  endOfSpectral: uint8,
  successiveApproximationBit: new BufferT(1),
  data: new ImageData()
};
const FrameColorComponent = new Struct({
  id: uint8,
  samplingFactors: uint8,
  quantizationTableId: uint8
});
const StartOfFrameMarker = {
  name: () => "SOF",
  length: uint16be,
  precision: uint8,
  height: uint16be,
  width: uint16be,
  numberOfComponents: uint8,
  components: new ArrayT(
    FrameColorComponent,
    (parent) => parent.numberOfComponents
  )
};
const StartOfImageMarker = {
  name: () => "SOI"
};
const UnknownMarker = {
  length: uint16be,
  buf: new BufferT((parent) => parent.length - 2)
};
const unknownMarkers = Array(63).fill(0).reduce((acc, v, i) => ({ ...acc, [i + 65472]: UnknownMarker }), {});
const Marker = new VersionedStruct(uint16be, {
  ...unknownMarkers,
  65472: StartOfFrameMarker,
  65473: StartOfFrameMarker,
  65474: StartOfFrameMarker,
  65475: StartOfFrameMarker,
  65476: DefineHuffmanTableMarker,
  65477: StartOfFrameMarker,
  65478: StartOfFrameMarker,
  65479: StartOfFrameMarker,
  65481: StartOfFrameMarker,
  65482: StartOfFrameMarker,
  65483: StartOfFrameMarker,
  65484: DACMarker,
  65485: StartOfFrameMarker,
  65486: StartOfFrameMarker,
  65487: StartOfFrameMarker,
  65496: StartOfImageMarker,
  65497: EndOfImageMarker,
  65498: SOSMarker,
  65499: DQTMarker,
  65501: DRIMarker,
  65504: JFIFMarker,
  65505: EXIFMarker
});
const JPEG = new ArrayT(Marker);
const decode = (buffer) => {
  const markers = JPEG.fromBuffer(buffer);
  return markers.map(({ version, ...rest }) => ({ type: version, ...rest }));
};
const _JPEG = { decode };
export {
  _JPEG as _
};
