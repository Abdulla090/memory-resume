const ENCODING_MAPPING = {
  utf16le: "utf-16le",
  ucs2: "utf-16le",
  utf16be: "utf-16be"
};
class DecodeStream {
  constructor(buffer) {
    this.buffer = buffer;
    this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    this.pos = 0;
    this.length = this.buffer.length;
  }
  readString(length, encoding = "ascii") {
    encoding = ENCODING_MAPPING[encoding] || encoding;
    let buf = this.readBuffer(length);
    try {
      let decoder = new TextDecoder(encoding);
      return decoder.decode(buf);
    } catch (err) {
      return buf;
    }
  }
  readBuffer(length) {
    return this.buffer.slice(this.pos, this.pos += length);
  }
  readUInt24BE() {
    return (this.readUInt16BE() << 8) + this.readUInt8();
  }
  readUInt24LE() {
    return this.readUInt16LE() + (this.readUInt8() << 16);
  }
  readInt24BE() {
    return (this.readInt16BE() << 8) + this.readUInt8();
  }
  readInt24LE() {
    return this.readUInt16LE() + (this.readInt8() << 16);
  }
}
DecodeStream.TYPES = {
  UInt8: 1,
  UInt16: 2,
  UInt24: 3,
  UInt32: 4,
  Int8: 1,
  Int16: 2,
  Int24: 3,
  Int32: 4,
  Float: 4,
  Double: 8
};
for (let key of Object.getOwnPropertyNames(DataView.prototype)) {
  if (key.slice(0, 3) === "get") {
    let type = key.slice(3).replace("Ui", "UI");
    if (type === "Float32") {
      type = "Float";
    } else if (type === "Float64") {
      type = "Double";
    }
    let bytes = DecodeStream.TYPES[type];
    DecodeStream.prototype["read" + type + (bytes === 1 ? "" : "BE")] = function() {
      const ret = this.view[key](this.pos, false);
      this.pos += bytes;
      return ret;
    };
    if (bytes !== 1) {
      DecodeStream.prototype["read" + type + "LE"] = function() {
        const ret = this.view[key](this.pos, true);
        this.pos += bytes;
        return ret;
      };
    }
  }
}
const textEncoder = new TextEncoder();
const isBigEndian = new Uint8Array(new Uint16Array([4660]).buffer)[0] == 18;
class EncodeStream {
  constructor(buffer) {
    this.buffer = buffer;
    this.view = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength);
    this.pos = 0;
  }
  writeBuffer(buffer) {
    this.buffer.set(buffer, this.pos);
    this.pos += buffer.length;
  }
  writeString(string, encoding = "ascii") {
    let buf;
    switch (encoding) {
      case "utf16le":
      case "utf16-le":
      case "ucs2":
        buf = stringToUtf16(string, isBigEndian);
        break;
      case "utf16be":
      case "utf16-be":
        buf = stringToUtf16(string, !isBigEndian);
        break;
      case "utf8":
        buf = textEncoder.encode(string);
        break;
      case "ascii":
        buf = stringToAscii(string);
        break;
      default:
        throw new Error(`Unsupported encoding: ${encoding}`);
    }
    this.writeBuffer(buf);
  }
  writeUInt24BE(val) {
    this.buffer[this.pos++] = val >>> 16 & 255;
    this.buffer[this.pos++] = val >>> 8 & 255;
    this.buffer[this.pos++] = val & 255;
  }
  writeUInt24LE(val) {
    this.buffer[this.pos++] = val & 255;
    this.buffer[this.pos++] = val >>> 8 & 255;
    this.buffer[this.pos++] = val >>> 16 & 255;
  }
  writeInt24BE(val) {
    if (val >= 0) {
      this.writeUInt24BE(val);
    } else {
      this.writeUInt24BE(val + 16777215 + 1);
    }
  }
  writeInt24LE(val) {
    if (val >= 0) {
      this.writeUInt24LE(val);
    } else {
      this.writeUInt24LE(val + 16777215 + 1);
    }
  }
  fill(val, length) {
    if (length < this.buffer.length) {
      this.buffer.fill(val, this.pos, this.pos + length);
      this.pos += length;
    } else {
      const buf = new Uint8Array(length);
      buf.fill(val);
      this.writeBuffer(buf);
    }
  }
}
function stringToUtf16(string, swap) {
  let buf = new Uint16Array(string.length);
  for (let i = 0; i < string.length; i++) {
    let code = string.charCodeAt(i);
    if (swap) {
      code = code >> 8 | (code & 255) << 8;
    }
    buf[i] = code;
  }
  return new Uint8Array(buf.buffer);
}
function stringToAscii(string) {
  let buf = new Uint8Array(string.length);
  for (let i = 0; i < string.length; i++) {
    buf[i] = string.charCodeAt(i);
  }
  return buf;
}
for (let key of Object.getOwnPropertyNames(DataView.prototype)) {
  if (key.slice(0, 3) === "set") {
    let type = key.slice(3).replace("Ui", "UI");
    if (type === "Float32") {
      type = "Float";
    } else if (type === "Float64") {
      type = "Double";
    }
    let bytes = DecodeStream.TYPES[type];
    EncodeStream.prototype["write" + type + (bytes === 1 ? "" : "BE")] = function(value) {
      this.view[key](this.pos, value, false);
      this.pos += bytes;
    };
    if (bytes !== 1) {
      EncodeStream.prototype["write" + type + "LE"] = function(value) {
        this.view[key](this.pos, value, true);
        this.pos += bytes;
      };
    }
  }
}
class Base {
  fromBuffer(buffer) {
    let stream = new DecodeStream(buffer);
    return this.decode(stream);
  }
  toBuffer(value) {
    let size = this.size(value);
    let buffer = new Uint8Array(size);
    let stream = new EncodeStream(buffer);
    this.encode(stream, value);
    return buffer;
  }
}
class NumberT extends Base {
  constructor(type, endian = "BE") {
    super();
    this.type = type;
    this.endian = endian;
    this.fn = this.type;
    if (this.type[this.type.length - 1] !== "8") {
      this.fn += this.endian;
    }
  }
  size() {
    return DecodeStream.TYPES[this.type];
  }
  decode(stream) {
    return stream[`read${this.fn}`]();
  }
  encode(stream, val) {
    return stream[`write${this.fn}`](val);
  }
}
const uint8 = new NumberT("UInt8");
const uint16be = new NumberT("UInt16", "BE");
const uint16 = uint16be;
const uint16le = new NumberT("UInt16", "LE");
const uint24be = new NumberT("UInt24", "BE");
const uint24 = uint24be;
new NumberT("UInt24", "LE");
const uint32be = new NumberT("UInt32", "BE");
const uint32 = uint32be;
const uint32le = new NumberT("UInt32", "LE");
const int8 = new NumberT("Int8");
const int16be = new NumberT("Int16", "BE");
const int16 = int16be;
new NumberT("Int16", "LE");
new NumberT("Int24", "BE");
new NumberT("Int24", "LE");
const int32be = new NumberT("Int32", "BE");
const int32 = int32be;
new NumberT("Int32", "LE");
new NumberT("Float", "BE");
new NumberT("Float", "LE");
new NumberT("Double", "BE");
new NumberT("Double", "LE");
class Fixed extends NumberT {
  constructor(size, endian, fracBits = size >> 1) {
    super(`Int${size}`, endian);
    this._point = 1 << fracBits;
  }
  decode(stream) {
    return super.decode(stream) / this._point;
  }
  encode(stream, val) {
    return super.encode(stream, val * this._point | 0);
  }
}
const fixed16be = new Fixed(16, "BE");
const fixed16 = fixed16be;
new Fixed(16, "LE");
const fixed32be = new Fixed(32, "BE");
const fixed32 = fixed32be;
new Fixed(32, "LE");
function resolveLength(length, stream, parent) {
  let res;
  if (typeof length === "number") {
    res = length;
  } else if (typeof length === "function") {
    res = length.call(parent, parent);
  } else if (parent && typeof length === "string") {
    res = parent[length];
  } else if (stream && length instanceof NumberT) {
    res = length.decode(stream);
  }
  if (isNaN(res)) {
    throw new Error("Not a fixed size");
  }
  return res;
}
class PropertyDescriptor {
  constructor(opts = {}) {
    this.enumerable = true;
    this.configurable = true;
    for (let key in opts) {
      const val = opts[key];
      this[key] = val;
    }
  }
}
class ArrayT extends Base {
  constructor(type, length, lengthType = "count") {
    super();
    this.type = type;
    this.length = length;
    this.lengthType = lengthType;
  }
  decode(stream, parent) {
    let length;
    const { pos } = stream;
    const res = [];
    let ctx = parent;
    if (this.length != null) {
      length = resolveLength(this.length, stream, parent);
    }
    if (this.length instanceof NumberT) {
      Object.defineProperties(res, {
        parent: { value: parent },
        _startOffset: { value: pos },
        _currentOffset: { value: 0, writable: true },
        _length: { value: length }
      });
      ctx = res;
    }
    if (length == null || this.lengthType === "bytes") {
      const target = length != null ? stream.pos + length : (parent != null ? parent._length : void 0) ? parent._startOffset + parent._length : stream.length;
      while (stream.pos < target) {
        res.push(this.type.decode(stream, ctx));
      }
    } else {
      for (let i = 0, end = length; i < end; i++) {
        res.push(this.type.decode(stream, ctx));
      }
    }
    return res;
  }
  size(array, ctx, includePointers = true) {
    if (!array) {
      return this.type.size(null, ctx) * resolveLength(this.length, null, ctx);
    }
    let size = 0;
    if (this.length instanceof NumberT) {
      size += this.length.size();
      ctx = { parent: ctx, pointerSize: 0 };
    }
    for (let item of array) {
      size += this.type.size(item, ctx);
    }
    if (ctx && includePointers && this.length instanceof NumberT) {
      size += ctx.pointerSize;
    }
    return size;
  }
  encode(stream, array, parent) {
    let ctx = parent;
    if (this.length instanceof NumberT) {
      ctx = {
        pointers: [],
        startOffset: stream.pos,
        parent
      };
      ctx.pointerOffset = stream.pos + this.size(array, ctx, false);
      this.length.encode(stream, array.length);
    }
    for (let item of array) {
      this.type.encode(stream, item, ctx);
    }
    if (this.length instanceof NumberT) {
      let i = 0;
      while (i < ctx.pointers.length) {
        const ptr = ctx.pointers[i++];
        ptr.type.encode(stream, ptr.val, ptr.parent);
      }
    }
  }
}
class LazyArray extends ArrayT {
  decode(stream, parent) {
    const { pos } = stream;
    const length = resolveLength(this.length, stream, parent);
    if (this.length instanceof NumberT) {
      parent = {
        parent,
        _startOffset: pos,
        _currentOffset: 0,
        _length: length
      };
    }
    const res = new LazyArrayValue(this.type, length, stream, parent);
    stream.pos += length * this.type.size(null, parent);
    return res;
  }
  size(val, ctx) {
    if (val instanceof LazyArrayValue) {
      val = val.toArray();
    }
    return super.size(val, ctx);
  }
  encode(stream, val, ctx) {
    if (val instanceof LazyArrayValue) {
      val = val.toArray();
    }
    return super.encode(stream, val, ctx);
  }
}
class LazyArrayValue {
  constructor(type, length, stream, ctx) {
    this.type = type;
    this.length = length;
    this.stream = stream;
    this.ctx = ctx;
    this.base = this.stream.pos;
    this.items = [];
  }
  get(index) {
    if (index < 0 || index >= this.length) {
      return void 0;
    }
    if (this.items[index] == null) {
      const { pos } = this.stream;
      this.stream.pos = this.base + this.type.size(null, this.ctx) * index;
      this.items[index] = this.type.decode(this.stream, this.ctx);
      this.stream.pos = pos;
    }
    return this.items[index];
  }
  toArray() {
    const result = [];
    for (let i = 0, end = this.length; i < end; i++) {
      result.push(this.get(i));
    }
    return result;
  }
}
class Bitfield extends Base {
  constructor(type, flags = []) {
    super();
    this.type = type;
    this.flags = flags;
  }
  decode(stream) {
    const val = this.type.decode(stream);
    const res = {};
    for (let i = 0; i < this.flags.length; i++) {
      const flag = this.flags[i];
      if (flag != null) {
        res[flag] = !!(val & 1 << i);
      }
    }
    return res;
  }
  size() {
    return this.type.size();
  }
  encode(stream, keys) {
    let val = 0;
    for (let i = 0; i < this.flags.length; i++) {
      const flag = this.flags[i];
      if (flag != null) {
        if (keys[flag]) {
          val |= 1 << i;
        }
      }
    }
    return this.type.encode(stream, val);
  }
}
class BufferT extends Base {
  constructor(length) {
    super();
    this.length = length;
  }
  decode(stream, parent) {
    const length = resolveLength(this.length, stream, parent);
    return stream.readBuffer(length);
  }
  size(val, parent) {
    if (!val) {
      return resolveLength(this.length, null, parent);
    }
    let len = val.length;
    if (this.length instanceof NumberT) {
      len += this.length.size();
    }
    return len;
  }
  encode(stream, buf, parent) {
    if (this.length instanceof NumberT) {
      this.length.encode(stream, buf.length);
    }
    return stream.writeBuffer(buf);
  }
}
class Optional extends Base {
  constructor(type, condition = true) {
    super();
    this.type = type;
    this.condition = condition;
  }
  decode(stream, parent) {
    let { condition } = this;
    if (typeof condition === "function") {
      condition = condition.call(parent, parent);
    }
    if (condition) {
      return this.type.decode(stream, parent);
    }
  }
  size(val, parent) {
    let { condition } = this;
    if (typeof condition === "function") {
      condition = condition.call(parent, parent);
    }
    if (condition) {
      return this.type.size(val, parent);
    } else {
      return 0;
    }
  }
  encode(stream, val, parent) {
    let { condition } = this;
    if (typeof condition === "function") {
      condition = condition.call(parent, parent);
    }
    if (condition) {
      return this.type.encode(stream, val, parent);
    }
  }
}
class Reserved extends Base {
  constructor(type, count = 1) {
    super();
    this.type = type;
    this.count = count;
  }
  decode(stream, parent) {
    stream.pos += this.size(null, parent);
    return void 0;
  }
  size(data, parent) {
    const count = resolveLength(this.count, null, parent);
    return this.type.size() * count;
  }
  encode(stream, val, parent) {
    return stream.fill(0, this.size(val, parent));
  }
}
class StringT extends Base {
  constructor(length, encoding = "ascii") {
    super();
    this.length = length;
    this.encoding = encoding;
  }
  decode(stream, parent) {
    let length, pos;
    let { encoding } = this;
    if (typeof encoding === "function") {
      encoding = encoding.call(parent, parent) || "ascii";
    }
    let width = encodingWidth(encoding);
    if (this.length != null) {
      length = resolveLength(this.length, stream, parent);
    } else {
      let buffer;
      ({ buffer, length, pos } = stream);
      while (pos < length - width + 1 && (buffer[pos] !== 0 || width === 2 && buffer[pos + 1] !== 0)) {
        pos += width;
      }
      length = pos - stream.pos;
    }
    const string = stream.readString(length, encoding);
    if (this.length == null && stream.pos < stream.length) {
      stream.pos += width;
    }
    return string;
  }
  size(val, parent) {
    if (val === void 0 || val === null) {
      return resolveLength(this.length, null, parent);
    }
    let { encoding } = this;
    if (typeof encoding === "function") {
      encoding = encoding.call(parent != null ? parent.val : void 0, parent != null ? parent.val : void 0) || "ascii";
    }
    if (encoding === "utf16be") {
      encoding = "utf16le";
    }
    let size = byteLength(val, encoding);
    if (this.length instanceof NumberT) {
      size += this.length.size();
    }
    if (this.length == null) {
      size += encodingWidth(encoding);
    }
    return size;
  }
  encode(stream, val, parent) {
    let { encoding } = this;
    if (typeof encoding === "function") {
      encoding = encoding.call(parent != null ? parent.val : void 0, parent != null ? parent.val : void 0) || "ascii";
    }
    if (this.length instanceof NumberT) {
      this.length.encode(stream, byteLength(val, encoding));
    }
    stream.writeString(val, encoding);
    if (this.length == null) {
      return encodingWidth(encoding) == 2 ? stream.writeUInt16LE(0) : stream.writeUInt8(0);
    }
  }
}
function encodingWidth(encoding) {
  switch (encoding) {
    case "ascii":
    case "utf8":
      return 1;
    case "utf16le":
    case "utf16-le":
    case "utf-16be":
    case "utf-16le":
    case "utf16be":
    case "utf16-be":
    case "ucs2":
      return 2;
    default:
      return 1;
  }
}
function byteLength(string, encoding) {
  switch (encoding) {
    case "ascii":
      return string.length;
    case "utf8":
      let len = 0;
      for (let i = 0; i < string.length; i++) {
        let c = string.charCodeAt(i);
        if (c >= 55296 && c <= 56319 && i < string.length - 1) {
          let c2 = string.charCodeAt(++i);
          if ((c2 & 64512) === 56320) {
            c = ((c & 1023) << 10) + (c2 & 1023) + 65536;
          } else {
            i--;
          }
        }
        if ((c & 4294967168) === 0) {
          len++;
        } else if ((c & 4294965248) === 0) {
          len += 2;
        } else if ((c & 4294901760) === 0) {
          len += 3;
        } else if ((c & 4292870144) === 0) {
          len += 4;
        }
      }
      return len;
    case "utf16le":
    case "utf16-le":
    case "utf16be":
    case "utf16-be":
    case "ucs2":
      return string.length * 2;
    default:
      throw new Error("Unknown encoding " + encoding);
  }
}
class Struct extends Base {
  constructor(fields = {}) {
    super();
    this.fields = fields;
  }
  decode(stream, parent, length = 0) {
    const res = this._setup(stream, parent, length);
    this._parseFields(stream, res, this.fields);
    if (this.process != null) {
      this.process.call(res, stream);
    }
    return res;
  }
  _setup(stream, parent, length) {
    const res = {};
    Object.defineProperties(res, {
      parent: { value: parent },
      _startOffset: { value: stream.pos },
      _currentOffset: { value: 0, writable: true },
      _length: { value: length }
    });
    return res;
  }
  _parseFields(stream, res, fields) {
    for (let key in fields) {
      var val;
      const type = fields[key];
      if (typeof type === "function") {
        val = type.call(res, res);
      } else {
        val = type.decode(stream, res);
      }
      if (val !== void 0) {
        if (val instanceof PropertyDescriptor) {
          Object.defineProperty(res, key, val);
        } else {
          res[key] = val;
        }
      }
      res._currentOffset = stream.pos - res._startOffset;
    }
  }
  size(val, parent, includePointers = true) {
    if (val == null) {
      val = {};
    }
    const ctx = {
      parent,
      val,
      pointerSize: 0
    };
    if (this.preEncode != null) {
      this.preEncode.call(val);
    }
    let size = 0;
    for (let key in this.fields) {
      const type = this.fields[key];
      if (type.size != null) {
        size += type.size(val[key], ctx);
      }
    }
    if (includePointers) {
      size += ctx.pointerSize;
    }
    return size;
  }
  encode(stream, val, parent) {
    let type;
    if (this.preEncode != null) {
      this.preEncode.call(val, stream);
    }
    const ctx = {
      pointers: [],
      startOffset: stream.pos,
      parent,
      val,
      pointerSize: 0
    };
    ctx.pointerOffset = stream.pos + this.size(val, ctx, false);
    for (let key in this.fields) {
      type = this.fields[key];
      if (type.encode != null) {
        type.encode(stream, val[key], ctx);
      }
    }
    let i = 0;
    while (i < ctx.pointers.length) {
      const ptr = ctx.pointers[i++];
      ptr.type.encode(stream, ptr.val, ptr.parent);
    }
  }
}
const getPath = (object, pathArray) => {
  return pathArray.reduce((prevObj, key) => prevObj && prevObj[key], object);
};
class VersionedStruct extends Struct {
  constructor(type, versions = {}) {
    super();
    this.type = type;
    this.versions = versions;
    if (typeof type === "string") {
      this.versionPath = type.split(".");
    }
  }
  decode(stream, parent, length = 0) {
    const res = this._setup(stream, parent, length);
    if (typeof this.type === "string") {
      res.version = getPath(parent, this.versionPath);
    } else {
      res.version = this.type.decode(stream);
    }
    if (this.versions.header) {
      this._parseFields(stream, res, this.versions.header);
    }
    const fields = this.versions[res.version];
    if (fields == null) {
      throw new Error(`Unknown version ${res.version}`);
    }
    if (fields instanceof VersionedStruct) {
      return fields.decode(stream, parent);
    }
    this._parseFields(stream, res, fields);
    if (this.process != null) {
      this.process.call(res, stream);
    }
    return res;
  }
  size(val, parent, includePointers = true) {
    let key, type;
    if (!val) {
      throw new Error("Not a fixed size");
    }
    if (this.preEncode != null) {
      this.preEncode.call(val);
    }
    const ctx = {
      parent,
      val,
      pointerSize: 0
    };
    let size = 0;
    if (typeof this.type !== "string") {
      size += this.type.size(val.version, ctx);
    }
    if (this.versions.header) {
      for (key in this.versions.header) {
        type = this.versions.header[key];
        if (type.size != null) {
          size += type.size(val[key], ctx);
        }
      }
    }
    const fields = this.versions[val.version];
    if (fields == null) {
      throw new Error(`Unknown version ${val.version}`);
    }
    for (key in fields) {
      type = fields[key];
      if (type.size != null) {
        size += type.size(val[key], ctx);
      }
    }
    if (includePointers) {
      size += ctx.pointerSize;
    }
    return size;
  }
  encode(stream, val, parent) {
    let key, type;
    if (this.preEncode != null) {
      this.preEncode.call(val, stream);
    }
    const ctx = {
      pointers: [],
      startOffset: stream.pos,
      parent,
      val,
      pointerSize: 0
    };
    ctx.pointerOffset = stream.pos + this.size(val, ctx, false);
    if (typeof this.type !== "string") {
      this.type.encode(stream, val.version);
    }
    if (this.versions.header) {
      for (key in this.versions.header) {
        type = this.versions.header[key];
        if (type.encode != null) {
          type.encode(stream, val[key], ctx);
        }
      }
    }
    const fields = this.versions[val.version];
    for (key in fields) {
      type = fields[key];
      if (type.encode != null) {
        type.encode(stream, val[key], ctx);
      }
    }
    let i = 0;
    while (i < ctx.pointers.length) {
      const ptr = ctx.pointers[i++];
      ptr.type.encode(stream, ptr.val, ptr.parent);
    }
  }
}
class Pointer extends Base {
  constructor(offsetType, type, options = {}) {
    super();
    this.offsetType = offsetType;
    this.type = type;
    this.options = options;
    if (this.type === "void") {
      this.type = null;
    }
    if (this.options.type == null) {
      this.options.type = "local";
    }
    if (this.options.allowNull == null) {
      this.options.allowNull = true;
    }
    if (this.options.nullValue == null) {
      this.options.nullValue = 0;
    }
    if (this.options.lazy == null) {
      this.options.lazy = false;
    }
    if (this.options.relativeTo) {
      if (typeof this.options.relativeTo !== "function") {
        throw new Error("relativeTo option must be a function");
      }
      this.relativeToGetter = options.relativeTo;
    }
  }
  decode(stream, ctx) {
    const offset = this.offsetType.decode(stream, ctx);
    if (offset === this.options.nullValue && this.options.allowNull) {
      return null;
    }
    let relative;
    switch (this.options.type) {
      case "local":
        relative = ctx._startOffset;
        break;
      case "immediate":
        relative = stream.pos - this.offsetType.size();
        break;
      case "parent":
        relative = ctx.parent._startOffset;
        break;
      default:
        var c = ctx;
        while (c.parent) {
          c = c.parent;
        }
        relative = c._startOffset || 0;
    }
    if (this.options.relativeTo) {
      relative += this.relativeToGetter(ctx);
    }
    const ptr = offset + relative;
    if (this.type != null) {
      let val = null;
      const decodeValue = () => {
        if (val != null) {
          return val;
        }
        const { pos } = stream;
        stream.pos = ptr;
        val = this.type.decode(stream, ctx);
        stream.pos = pos;
        return val;
      };
      if (this.options.lazy) {
        return new PropertyDescriptor({
          get: decodeValue
        });
      }
      return decodeValue();
    } else {
      return ptr;
    }
  }
  size(val, ctx) {
    const parent = ctx;
    switch (this.options.type) {
      case "local":
      case "immediate":
        break;
      case "parent":
        ctx = ctx.parent;
        break;
      default:
        while (ctx.parent) {
          ctx = ctx.parent;
        }
    }
    let { type } = this;
    if (type == null) {
      if (!(val instanceof VoidPointer)) {
        throw new Error("Must be a VoidPointer");
      }
      ({ type } = val);
      val = val.value;
    }
    if (val && ctx) {
      let size = type.size(val, parent);
      ctx.pointerSize += size;
    }
    return this.offsetType.size();
  }
  encode(stream, val, ctx) {
    let relative;
    const parent = ctx;
    if (val == null) {
      this.offsetType.encode(stream, this.options.nullValue);
      return;
    }
    switch (this.options.type) {
      case "local":
        relative = ctx.startOffset;
        break;
      case "immediate":
        relative = stream.pos + this.offsetType.size(val, parent);
        break;
      case "parent":
        ctx = ctx.parent;
        relative = ctx.startOffset;
        break;
      default:
        relative = 0;
        while (ctx.parent) {
          ctx = ctx.parent;
        }
    }
    if (this.options.relativeTo) {
      relative += this.relativeToGetter(parent.val);
    }
    this.offsetType.encode(stream, ctx.pointerOffset - relative);
    let { type } = this;
    if (type == null) {
      if (!(val instanceof VoidPointer)) {
        throw new Error("Must be a VoidPointer");
      }
      ({ type } = val);
      val = val.value;
    }
    ctx.pointers.push({
      type,
      val,
      parent
    });
    return ctx.pointerOffset += type.size(val, parent);
  }
}
class VoidPointer {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}
export {
  ArrayT as A,
  Bitfield as B,
  DecodeStream as D,
  EncodeStream as E,
  Fixed as F,
  LazyArray as L,
  NumberT as N,
  Optional as O,
  Pointer as P,
  Reserved as R,
  Struct as S,
  VersionedStruct as V,
  uint32 as a,
  uint8 as b,
  uint24 as c,
  int32 as d,
  StringT as e,
  fixed32 as f,
  BufferT as g,
  int8 as h,
  int16 as i,
  fixed16 as j,
  VoidPointer as k,
  PropertyDescriptor as l,
  uint16be as m,
  uint32be as n,
  uint32le as o,
  uint16le as p,
  resolveLength as r,
  uint16 as u
};
