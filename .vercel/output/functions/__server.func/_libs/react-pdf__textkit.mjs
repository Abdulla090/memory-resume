import { c as compose, i as isNil, r as repeat, l as last, d as dropLast$2, b as adjust, e as reverse } from "./react-pdf__fns.mjs";
import { b as bidiFactory } from "./bidi-js.mjs";
import { e as $747425b437e121da$export$2e2bcd8739ae039 } from "./unicode-properties.mjs";
import { h as hyphen, p as pattern } from "./hyphen.mjs";
const SCRIPTS_NEEDING_DECOMPOSITION = [
  "Bengali",
  "Devanagari",
  "Gujarati",
  "Gurmukhi",
  "Kannada",
  "Khmer",
  "Malayalam",
  "Myanmar",
  "Oriya",
  "Sinhala",
  "Tamil",
  "Telugu",
  "Tibetan"
];
const scriptPattern = SCRIPTS_NEEDING_DECOMPOSITION.map((s) => `\\p{Script=${s}}`).join("|");
const HAS_COMPLEX_SCRIPT = new RegExp(scriptPattern, "u");
const COMPLEX_SCRIPT_CHARS = new RegExp(`(?:${scriptPattern})+`, "gu");
const selectiveNFD = (str) => {
  if (!HAS_COMPLEX_SCRIPT.test(str))
    return str;
  return str.replace(COMPLEX_SCRIPT_CHARS, (match) => match.normalize("NFD"));
};
const isCustomFont = (run) => {
  const font = run.attributes?.font?.[0];
  return !!font && font.type !== "STANDARD";
};
const decomposeUnicode = () => {
  return (attributedString) => {
    let string = "";
    let offset2 = 0;
    const runs = [];
    for (let i = 0; i < attributedString.runs.length; i += 1) {
      const run = attributedString.runs[i];
      const rawString = attributedString.string.slice(run.start, run.end);
      const runString = isCustomFont(run) ? selectiveNFD(rawString) : rawString;
      const fragmentLength = runString.length;
      runs.push({
        ...run,
        start: offset2,
        end: offset2 + fragmentLength
      });
      offset2 += fragmentLength;
      string += runString;
    }
    return { ...attributedString, string, runs };
  };
};
const fromFragments = (fragments) => {
  let offset2 = 0;
  const strings = [];
  const runs = [];
  for (let i = 0; i < fragments.length; i += 1) {
    const fragment = fragments[i];
    const fragmentLength = fragment.string.length;
    strings.push(fragment.string);
    runs.push({
      ...fragment,
      start: offset2,
      end: offset2 + fragmentLength,
      attributes: fragment.attributes || {}
    });
    offset2 += fragmentLength;
  }
  return { string: strings.join(""), runs };
};
const SOFT_HYPHEN$1 = "­";
const defaultHyphenate = (word) => [word];
const removeSoftHyphens = (word) => {
  return word.replaceAll(SOFT_HYPHEN$1, "");
};
const wrapWords = (engines = {}, options = {}) => {
  return (attributedString) => {
    const syllables = [];
    const fragments = [];
    const builtinHyphenate = engines.wordHyphenation?.() || defaultHyphenate;
    const hyphenate = options.hyphenationCallback || builtinHyphenate;
    let offset2 = 0;
    for (let i = 0; i < attributedString.runs.length; i += 1) {
      let string = "";
      const run = attributedString.runs[i];
      const words = attributedString.string.slice(run.start, run.end).split(/([ ]+)/g).filter(Boolean);
      for (let j = 0; j < words.length; j += 1) {
        const word = words[j];
        const parts = hyphenate(word, builtinHyphenate).map(removeSoftHyphens);
        syllables.push(...parts);
        string += parts.join("");
      }
      const runOffset = run.end - run.start - string.length;
      const start2 = run.start - offset2;
      const end2 = run.end - offset2 - runOffset;
      fragments.push({ ...run, start: start2, end: end2, string });
      offset2 += runOffset;
    }
    const result = { ...fromFragments(fragments), syllables };
    return result;
  };
};
const copy = (rect) => {
  return Object.assign({}, rect);
};
const partition = (rect, height2) => {
  const a = Object.assign({}, rect, { height: height2 });
  const b = Object.assign({}, rect, {
    y: rect.y + height2,
    height: rect.height - height2
  });
  return [a, b];
};
const crop = (height2, rect) => {
  const [, result] = partition(rect, height2);
  return result;
};
const height$2 = (paragraph) => {
  return paragraph.reduce((acc, block) => acc + block.box.height, 0);
};
const calculateScale = (run) => {
  const attributes = run.attributes || {};
  const fontSize = attributes.fontSize || 12;
  const font = attributes.font;
  const unitsPerEm = typeof font === "string" ? null : font?.[0]?.unitsPerEm;
  return unitsPerEm ? fontSize / unitsPerEm : 0;
};
const scale = (run) => {
  return run.attributes?.scale || calculateScale(run);
};
const offset = (index, run) => {
  if (!run)
    return 0;
  const stringIndices = run.stringIndices || [];
  const value = stringIndices[index];
  return stringIndices.slice(0, index).filter((i) => i === value).length;
};
const getFont = (run) => {
  return run.attributes?.font?.[0] || null;
};
const slice$2 = (start2, end2, font, glyph) => {
  if (!glyph)
    return [];
  if (start2 === end2)
    return [];
  const { codePoints } = glyph;
  if (start2 === 0 && end2 === codePoints.length)
    return [glyph];
  if (!font)
    return [glyph];
  const slicedCodePoints = codePoints.slice(start2, end2);
  const string = String.fromCodePoint(...slicedCodePoints);
  return font.layout(string, void 0, void 0, void 0, "ltr").glyphs;
};
const glyphIndexAt = (index, run) => {
  const glyphIndices = run?.glyphIndices;
  if (!glyphIndices)
    return index;
  if (glyphIndices.length > 0 && index > glyphIndices[glyphIndices.length - 1]) {
    return glyphIndices.length;
  }
  let result = index;
  for (let i = glyphIndices.length - 1; i >= 0; i -= 1) {
    if (glyphIndices[i] <= index) {
      result = i;
      break;
    }
  }
  return result;
};
const normalize = (array) => {
  if (array.length === 0)
    return [];
  const offset2 = array[0];
  return array.map((value) => value - offset2);
};
const slice$1 = (start2, end2, run) => {
  const runScale = scale(run);
  const font = getFont(run);
  const startIndex = glyphIndexAt(start2, run);
  const endIndex = glyphIndexAt(end2 - 1, run);
  const startGlyph = run.glyphs?.[startIndex];
  const endGlyph = run.glyphs?.[endIndex];
  const startOffset = offset(start2, run);
  const startGlyphs = startOffset > 0 ? slice$2(startOffset, Infinity, font, startGlyph) : [];
  const endOffset = offset(end2, run);
  const endGlyphs = slice$2(0, endOffset, font, endGlyph);
  const startGlyphCovers = (run.glyphIndices?.[startIndex] ?? startIndex) >= start2;
  const sliceStart = startIndex + (startOffset > 0 || !startGlyphCovers ? 1 : 0);
  const sliceEnd = endIndex + 1 - Math.min(1, endOffset);
  const glyphs = (run.glyphs || []).slice(sliceStart, sliceEnd);
  const glyphPosition = (g) => ({
    xAdvance: g.advanceWidth * runScale,
    yAdvance: 0,
    xOffset: 0,
    yOffset: 0
  });
  const startPositions = startGlyphs.map(glyphPosition);
  const positions = (run.positions || []).slice(sliceStart, sliceEnd);
  const endPositions = endGlyphs.map(glyphPosition);
  const stringIndices = normalize((run.stringIndices || []).slice(start2, end2));
  const startGlyphIndices = startGlyphs.map((_, i) => (run.glyphIndices?.[startIndex] ?? 0) - start2 + startOffset + i);
  const slicedGlyphIndices = (run.glyphIndices || []).slice(sliceStart, sliceEnd).map((v) => v - start2);
  const endGlyphIndices = endGlyphs.map((_, i) => (run.glyphIndices?.[endIndex] ?? 0) - start2 + i);
  const glyphIndices = [
    startGlyphIndices,
    slicedGlyphIndices,
    endGlyphIndices
  ].flat();
  return Object.assign({}, run, {
    start: Math.max(run.start + start2, 0),
    end: Math.max(Math.min(run.end, run.start + end2), 0),
    stringIndices,
    glyphIndices,
    glyphs: [startGlyphs, glyphs, endGlyphs].flat(),
    positions: [startPositions, positions, endPositions].flat()
  });
};
const runIndexAt$1 = (index, runs) => {
  if (!runs)
    return -1;
  return runs.findIndex((run) => run.start <= index && index < run.end);
};
const filter = (start2, end2, runs) => {
  const startIndex = runIndexAt$1(start2, runs);
  const endIndex = Math.max(runIndexAt$1(end2 - 1, runs), startIndex);
  return runs.slice(startIndex, endIndex + 1);
};
const subtract = (index, run) => {
  const start2 = run.start - index;
  const end2 = run.end - index;
  return Object.assign({}, run, { start: start2, end: end2 });
};
const sliceRuns = (start2, end2, runs) => {
  const sliceFirstRun = (a) => slice$1(start2 - a.start, end2 - a.start, a);
  const sliceLastRun = (a) => slice$1(0, end2 - a.start, a);
  return runs.map((run, i) => {
    let result = run;
    const isFirst = i === 0;
    const isLast = !isFirst && i === runs.length - 1;
    if (isFirst)
      result = sliceFirstRun(run);
    if (isLast)
      result = sliceLastRun(run);
    return subtract(start2, result);
  });
};
const slice = (start2, end2, attributedString) => {
  if (attributedString.string.length === 0)
    return attributedString;
  const string = attributedString.string.slice(start2, end2);
  const filteredRuns = filter(start2, end2, attributedString.runs);
  const slicedRuns = sliceRuns(start2, end2, filteredRuns);
  return Object.assign({}, attributedString, { string, runs: slicedRuns });
};
const WHITESPACE_REGEX = /\S/;
const findCharIndex = (string) => {
  return string.search(WHITESPACE_REGEX);
};
const findLastCharIndex = (string) => {
  for (let i = string.length - 1; i >= 0; i -= 1) {
    if (WHITESPACE_REGEX.test(string[i]))
      return i;
  }
  return -1;
};
const trim = (attributedString) => {
  const start2 = findCharIndex(attributedString.string);
  const end2 = findLastCharIndex(attributedString.string);
  return slice(start2, end2 + 1, attributedString);
};
const empty$1 = () => {
  return {
    start: 0,
    end: 0,
    stringIndices: [],
    glyphIndices: [],
    glyphs: [],
    positions: [],
    attributes: {}
  };
};
const isNumber = (value) => {
  return typeof value === "number";
};
const appendIndices$1 = (length2, indices) => {
  const lastIndex = last(indices);
  const value = isNil(lastIndex) ? 0 : lastIndex + 1;
  const newIndices = Array(length2).fill(value);
  return indices.concat(newIndices);
};
const appendIndices = (value, indices) => {
  return indices.concat([value]);
};
const fromCodePoint = (codePoint, font) => {
  if (typeof font === "string")
    return null;
  if (!font || !codePoint)
    return null;
  return font.glyphForCodePoint(codePoint);
};
const appendGlyph = (glyph, run) => {
  const glyphLength = glyph.codePoints?.length || 0;
  const stringLength = run.stringIndices?.length || 0;
  const glyphs = run.glyphs.concat(glyph);
  const stringIndices = appendIndices$1(glyphLength, run.stringIndices);
  const glyphIndices = appendIndices(stringLength, run.glyphIndices);
  const end2 = run.end + glyphLength;
  if (!run.positions)
    return Object.assign({}, run, { end: end2, glyphs, stringIndices, glyphIndices });
  const positions = run.positions.concat({
    xAdvance: glyph.advanceWidth * scale(run),
    yAdvance: 0,
    xOffset: 0,
    yOffset: 0
  });
  return Object.assign({}, run, {
    end: end2,
    glyphs,
    stringIndices,
    glyphIndices,
    positions
  });
};
const append$1 = (value, run) => {
  if (!value)
    return run;
  const font = getFont(run);
  const glyph = isNumber(value) ? fromCodePoint(value, font) : value;
  return appendGlyph(glyph, run);
};
const stringFromCodePoints = (codePoints) => {
  return String.fromCodePoint(...codePoints || []);
};
const append = (glyph, attributedString) => {
  const codePoints = typeof glyph === "number" ? [glyph] : glyph?.codePoints;
  const codePointsString = stringFromCodePoints(codePoints || []);
  const string = attributedString.string + codePointsString;
  const firstRuns = attributedString.runs.slice(0, -1);
  const lastRun = last(attributedString.runs) || empty$1();
  const runs = firstRuns.concat(append$1(glyph, lastRun));
  return Object.assign({}, attributedString, { string, runs });
};
const ELLIPSIS_UNICODE = 8230;
const ELLIPSIS_STRING = String.fromCharCode(ELLIPSIS_UNICODE);
const getEllipsisCodePoint = (font) => {
  if (!font.encode)
    return ELLIPSIS_UNICODE;
  const [codePoints] = font.encode(ELLIPSIS_STRING);
  return parseInt(codePoints[0], 16);
};
const truncate = (paragraph) => {
  const runs = last(paragraph)?.runs || [];
  const font = last(runs)?.attributes?.font[0];
  if (font) {
    const index = paragraph.length - 1;
    const codePoint = getEllipsisCodePoint(font);
    const glyph = font.glyphForCodePoint(codePoint);
    const lastBlock = append(glyph, trim(paragraph[index]));
    return Object.assign([], paragraph, { [index]: lastBlock });
  }
  return paragraph;
};
const omit = (value, run) => {
  const attributes = Object.assign({}, run.attributes);
  delete attributes[value];
  return Object.assign({}, run, { attributes });
};
const ascent$1 = (run) => {
  const { font, attachment } = run.attributes;
  const attachmentHeight = attachment?.height || 0;
  const fontAscent = typeof font === "string" ? 0 : font?.[0]?.ascent || 0;
  return Math.max(attachmentHeight, fontAscent * scale(run));
};
const descent = (run) => {
  const font = run.attributes?.font;
  const fontDescent = typeof font === "string" ? 0 : font?.[0]?.descent || 0;
  return scale(run) * fontDescent;
};
const lineGap = (run) => {
  const font = run.attributes?.font;
  const lineGap2 = typeof font === "string" ? 0 : font?.[0]?.lineGap || 0;
  return lineGap2 * scale(run);
};
const height$1 = (run) => {
  const lineHeight = run.attributes?.lineHeight;
  return lineHeight || lineGap(run) + ascent$1(run) - descent(run);
};
const height = (attributedString) => {
  const reducer = (acc, run) => Math.max(acc, height$1(run));
  return attributedString.runs.reduce(reducer, 0);
};
const intersects = (a, b) => {
  const x = Math.max(a.x, b.x);
  const num1 = Math.min(a.x + a.width, b.x + b.width);
  const y = Math.max(a.y, b.y);
  const num2 = Math.min(a.y + a.height, b.y + b.height);
  return num1 >= x && num2 >= y;
};
const getLineFragment = (lineRect, excludeRect) => {
  if (!intersects(excludeRect, lineRect))
    return [lineRect];
  const eStart = excludeRect.x;
  const eEnd = excludeRect.x + excludeRect.width;
  const lStart = lineRect.x;
  const lEnd = lineRect.x + lineRect.width;
  const a = Object.assign({}, lineRect, { width: eStart - lStart });
  const b = Object.assign({}, lineRect, { x: eEnd, width: lEnd - eEnd });
  return [a, b].filter((r) => r.width > 0);
};
const getLineFragments = (rect, excludeRects) => {
  let fragments = [rect];
  for (let i = 0; i < excludeRects.length; i += 1) {
    const excludeRect = excludeRects[i];
    fragments = fragments.reduce((acc, fragment) => {
      const pieces = getLineFragment(fragment, excludeRect);
      return acc.concat(pieces);
    }, []);
  }
  return fragments;
};
const generateLineRects = (container, height2) => {
  const { excludeRects, ...rect } = container;
  if (!excludeRects)
    return [rect];
  const lineRects = [];
  const maxY = Math.max(...excludeRects.map((r) => r.y + r.height));
  let currentRect = rect;
  while (currentRect.y < maxY) {
    const [lineRect, rest] = partition(currentRect, height2);
    const lineRectFragments = getLineFragments(lineRect, excludeRects);
    currentRect = rest;
    lineRects.push(...lineRectFragments);
  }
  return [...lineRects, currentRect];
};
const ATTACHMENT_CODE$1 = "￼";
const purgeAttachments = (line) => {
  const shouldPurge = !line.string.includes(ATTACHMENT_CODE$1);
  if (!shouldPurge)
    return line;
  const runs = line.runs.map((run) => omit("attachment", run));
  return Object.assign({}, line, { runs });
};
const layoutLines = (rects, lines, indent) => {
  let rect = rects.shift();
  let currentY = rect.y;
  return lines.map((line, i) => {
    const lineIndent = i === 0 ? indent : 0;
    const style = line.runs?.[0]?.attributes || {};
    const height$12 = Math.max(height(line), style.lineHeight);
    if (currentY + height$12 > rect.y + rect.height && rects.length > 0) {
      rect = rects.shift();
      currentY = rect.y;
    }
    const newLine = {
      string: line.string,
      runs: line.runs,
      box: {
        x: rect.x + lineIndent,
        y: currentY,
        width: rect.width - lineIndent,
        height: height$12
      }
    };
    currentY += height$12;
    return purgeAttachments(newLine);
  });
};
const layoutParagraph = (engines, options = {}) => {
  return (container, paragraph) => {
    const height$12 = height(paragraph);
    const indent = paragraph.runs?.[0]?.attributes?.indent || 0;
    const rects = generateLineRects(container, height$12);
    const availableWidths = rects.map((r) => r.width);
    availableWidths.unshift(availableWidths[0] - indent);
    const lines = engines.linebreaker(options)(paragraph, availableWidths);
    return layoutLines(rects, lines, indent);
  };
};
const sliceAtHeight = (height2, paragraph) => {
  const newBlock = [];
  let counter = 0;
  for (let i = 0; i < paragraph.length; i += 1) {
    const line = paragraph[i];
    counter += line.box.height;
    if (counter < height2) {
      newBlock.push(line);
    } else {
      break;
    }
  }
  return newBlock;
};
const typesetter = (engines, options, container) => {
  return (attributedStrings) => {
    const result = [];
    const paragraphs = [...attributedStrings];
    const layout = layoutParagraph(engines, options);
    const maxLines = isNil(container.maxLines) ? Infinity : container.maxLines;
    const truncateEllipsis = container.truncateMode === "ellipsis";
    let linesCount = maxLines;
    let paragraphRect = copy(container);
    let nextParagraph = paragraphs.shift();
    while (linesCount > 0 && nextParagraph) {
      const paragraph = layout(paragraphRect, nextParagraph);
      const slicedBlock = paragraph.slice(0, linesCount);
      const linesHeight = height$2(slicedBlock);
      const shouldTruncate = truncateEllipsis && paragraph.length !== slicedBlock.length;
      linesCount -= slicedBlock.length;
      if (paragraphRect.height >= linesHeight) {
        result.push(shouldTruncate ? truncate(slicedBlock) : slicedBlock);
        paragraphRect = crop(linesHeight, paragraphRect);
        nextParagraph = paragraphs.shift();
      } else {
        result.push(truncate(sliceAtHeight(paragraphRect.height, slicedBlock)));
        break;
      }
    }
    return result;
  };
};
const start = (attributedString) => {
  const { runs } = attributedString;
  return runs.length === 0 ? 0 : runs[0].start;
};
const end = (attributedString) => {
  const { runs } = attributedString;
  return runs.length === 0 ? 0 : last(runs).end;
};
const length$1 = (attributedString) => {
  return end(attributedString) - start(attributedString);
};
const bidi$2 = bidiFactory();
const getBidiLevels$1 = (runs) => {
  return runs.reduce((acc, run) => {
    const length2 = run.end - run.start;
    const levels = repeat(run.attributes.bidiLevel, length2);
    return acc.concat(levels);
  }, []);
};
const getReorderedIndices = (string, segments) => {
  const indices = [];
  for (let i = 0; i < string.length; i += 1) {
    indices[i] = i;
  }
  segments.forEach(([start2, end2]) => {
    const slice2 = indices.slice(start2, end2 + 1);
    for (let i = slice2.length - 1; i >= 0; i -= 1) {
      indices[end2 - i] = slice2[i];
    }
  });
  return indices;
};
const getItemAtIndex = (runs, objectName, index) => {
  for (let i = 0; i < runs.length; i += 1) {
    const run = runs[i];
    const updatedIndex = run.stringIndices[index - run.start];
    if (index >= run.start && index < run.end) {
      return run[objectName][updatedIndex];
    }
  }
  throw new Error(`index ${index} out of range`);
};
const reorderLine = (line) => {
  const levels = getBidiLevels$1(line.runs);
  const direction = line.runs[0]?.attributes.direction;
  const level = direction === "rtl" ? 1 : 0;
  const end2 = length$1(line) - 1;
  const paragraphs = [{ start: 0, end: end2, level }];
  const embeddingLevels = { paragraphs, levels };
  const segments = bidi$2.getReorderSegments(line.string, embeddingLevels);
  if (segments.length === 0)
    return line;
  const indices = getReorderedIndices(line.string, segments);
  const updatedString = bidi$2.getReorderedString(line.string, embeddingLevels);
  const updatedRuns = line.runs.map((run) => {
    const selectedIndices = indices.slice(run.start, run.end);
    const updatedGlyphs = [];
    const updatedPositions = [];
    const addedGlyphs = /* @__PURE__ */ new Set();
    for (let i = 0; i < selectedIndices.length; i += 1) {
      const index = selectedIndices[i];
      const glyph = getItemAtIndex(line.runs, "glyphs", index);
      if (addedGlyphs.has(glyph.id))
        continue;
      updatedGlyphs.push(glyph);
      updatedPositions.push(getItemAtIndex(line.runs, "positions", index));
      if (glyph.isLigature) {
        addedGlyphs.add(glyph.id);
      }
    }
    return {
      ...run,
      glyphs: updatedGlyphs,
      positions: updatedPositions
    };
  });
  return {
    box: line.box,
    runs: updatedRuns,
    string: updatedString
  };
};
const reorderParagraph = (paragraph) => paragraph.map(reorderLine);
const bidiReordering = () => {
  return (paragraphs) => paragraphs.map(reorderParagraph);
};
const resolve$1 = (glyphs = []) => {
  const result = [];
  let currentIndex = 0;
  for (let i = 0; i < glyphs.length; i += 1) {
    const glyph = glyphs[i];
    const codePointCount = glyph?.codePoints?.length || 0;
    for (let j = 0; j < codePointCount; j += 1) {
      result.push(currentIndex);
    }
    currentIndex += 1;
  }
  return result;
};
const resolve = (glyphs = []) => {
  const result = [];
  let currentIndex = 0;
  for (let i = 0; i < glyphs.length; i += 1) {
    const glyph = glyphs[i];
    const length2 = glyph?.codePoints?.length || 0;
    const value = length2 === 0 ? result[i - 1] : currentIndex;
    result.push(value);
    currentIndex += length2;
  }
  return result;
};
const getCharacterSpacing = (run) => {
  return run.attributes?.characterSpacing || 0;
};
const scalePositions = (run, positions) => {
  const runScale = scale(run);
  const characterSpacing = getCharacterSpacing(run);
  return positions.map((position, i) => {
    const isLast = i === positions.length;
    const xSpacing = isLast ? 0 : characterSpacing;
    return Object.assign({}, position, {
      xAdvance: position.xAdvance * runScale + xSpacing,
      yAdvance: position.yAdvance * runScale,
      xOffset: position.xOffset * runScale,
      yOffset: position.yOffset * runScale
    });
  });
};
const layoutRun = (string) => {
  return (run) => {
    const { start: start2, end: end2, attributes = {} } = run;
    const { font } = attributes;
    if (!font)
      return {
        ...run,
        glyphs: [],
        stringIndices: [],
        glyphIndices: [],
        positions: []
      };
    const runString = string.slice(start2, end2);
    if (typeof font === "string")
      throw new Error("Invalid font");
    const glyphRun = font[0].layout(runString, void 0, void 0, void 0, "ltr");
    const positions = scalePositions(run, glyphRun.positions);
    const stringIndices = resolve$1(glyphRun.glyphs);
    const glyphIndices = resolve(glyphRun.glyphs);
    const result = {
      ...run,
      positions,
      stringIndices,
      glyphIndices,
      glyphs: glyphRun.glyphs
    };
    return result;
  };
};
const generateGlyphs = () => {
  return (attributedString) => {
    const runs = attributedString.runs.map(layoutRun(attributedString.string));
    const res = Object.assign({}, attributedString, { runs });
    return res;
  };
};
const resolveRunYOffset = (run) => {
  if (!run.positions)
    return run;
  const unitsPerEm = run.attributes?.font?.[0]?.unitsPerEm || 0;
  const yOffset = (run.attributes?.yOffset || 0) * unitsPerEm;
  const positions = run.positions.map((p) => Object.assign({}, p, { yOffset }));
  return Object.assign({}, run, { positions });
};
const resolveYOffset = () => {
  return (attributedString) => {
    const runs = attributedString.runs.map(resolveRunYOffset);
    const res = Object.assign({}, attributedString, { runs });
    return res;
  };
};
const sort = (runs) => {
  return runs.sort((a, b) => a.start - b.start || a.end - b.end);
};
const isEmpty = (run) => {
  return run.start === run.end;
};
const sortPoints = (a, b) => {
  return a[1] - b[1] || a[3] - b[3];
};
const generatePoints = (runs) => {
  const result = runs.reduce((acc, run, i) => {
    return acc.concat([
      ["start", run.start, run.attributes, i],
      ["end", run.end, run.attributes, i]
    ]);
  }, []);
  return result.sort(sortPoints);
};
const mergeRuns = (runs) => {
  return runs.reduce((acc, run) => {
    const attributes = Object.assign({}, acc.attributes, run.attributes);
    return Object.assign({}, run, { attributes });
  }, {});
};
const groupEmptyRuns = (runs) => {
  const groups = runs.reduce((acc, run) => {
    if (!acc[run.start])
      acc[run.start] = [];
    acc[run.start].push(run);
    return acc;
  }, []);
  return Object.values(groups);
};
const flattenEmptyRuns = (runs) => {
  return groupEmptyRuns(runs).map(mergeRuns);
};
const flattenRegularRuns = (runs) => {
  const res = [];
  const points = generatePoints(runs);
  let start2 = -1;
  let attrs = {};
  const stack = [];
  for (let i = 0; i < points.length; i += 1) {
    const [type, offset2, attributes] = points[i];
    if (start2 !== -1 && start2 < offset2) {
      res.push({
        start: start2,
        end: offset2,
        attributes: attrs,
        stringIndices: [],
        glyphIndices: [],
        glyphs: [],
        positions: []
      });
    }
    if (type === "start") {
      stack.push(attributes);
      attrs = Object.assign({}, attrs, attributes);
    } else {
      attrs = {};
      for (let j = 0; j < stack.length; j += 1) {
        if (stack[j] === attributes) {
          stack.splice(j--, 1);
        } else {
          attrs = Object.assign({}, attrs, stack[j]);
        }
      }
    }
    start2 = offset2;
  }
  return res;
};
const flatten = (runs = []) => {
  const emptyRuns = flattenEmptyRuns(runs.filter((run) => isEmpty(run)));
  const regularRuns = flattenRegularRuns(runs.filter((run) => !isEmpty(run)));
  return sort(emptyRuns.concat(regularRuns));
};
const empty = () => ({ string: "", runs: [] });
const omitFont = (attributedString) => {
  const runs = attributedString.runs.map((run) => omit("font", run));
  return Object.assign({}, attributedString, { runs });
};
const preprocessRuns = (engines) => {
  return (attributedString) => {
    if (isNil(attributedString))
      return empty();
    const { string } = attributedString;
    const { fontSubstitution: fontSubstitution2, scriptItemizer: scriptItemizer2, bidi: bidi2 } = engines;
    const { runs: omittedFontRuns } = omitFont(attributedString);
    const { runs: itemizationRuns } = scriptItemizer2()(attributedString);
    const { runs: substitutedRuns } = fontSubstitution2()(attributedString);
    const { runs: bidiRuns } = bidi2()(attributedString);
    const runs = bidiRuns.concat(substitutedRuns).concat(itemizationRuns).concat(omittedFontRuns);
    return { string, runs: flatten(runs) };
  };
};
const splitParagraphs = () => {
  return (attributedString) => {
    const paragraphs = [];
    let start2 = 0;
    let breakPoint = attributedString.string.indexOf("\n") + 1;
    while (breakPoint > 0) {
      paragraphs.push(slice(start2, breakPoint, attributedString));
      start2 = breakPoint;
      breakPoint = attributedString.string.indexOf("\n", breakPoint) + 1;
    }
    if (start2 === 0) {
      paragraphs.push(attributedString);
    } else if (start2 < attributedString.string.length) {
      paragraphs.push(slice(start2, length$1(attributedString), attributedString));
    }
    return paragraphs;
  };
};
const advanceWidth$2 = (positions) => {
  return positions.reduce((acc, pos) => acc + (pos.xAdvance || 0), 0);
};
const advanceWidth$1 = (run) => {
  return advanceWidth$2(run.positions || []);
};
const advanceWidth = (attributedString) => {
  const reducer = (acc, run) => acc + advanceWidth$1(run);
  return attributedString.runs.reduce(reducer, 0);
};
const SPACE_CODE = 32;
const isWhiteSpace$1 = (glyph) => {
  const codePoints = glyph?.codePoints || [];
  return codePoints.includes(SPACE_CODE);
};
const isWhiteSpace = (run) => {
  const glyphs = run?.glyphs || [];
  return glyphs.length > 0 && glyphs.every(isWhiteSpace$1);
};
const leadingPositions = (run) => {
  const glyphs = run.glyphs || [];
  const positions = run.positions || [];
  const leadingWhitespaces = glyphs.findIndex((g) => !isWhiteSpace$1(g));
  return leadingWhitespaces === -1 ? positions : positions.slice(0, leadingWhitespaces);
};
const leadingOffset$1 = (run) => {
  if (!run)
    return 0;
  const positions = leadingPositions(run);
  return positions.reduce((acc, pos) => acc + (pos.xAdvance || 0), 0);
};
const leadingOffset = (attributedString) => {
  const runs = attributedString.runs || [];
  let offset2 = 0;
  for (const run of runs) {
    offset2 += leadingOffset$1(run);
    if (!isWhiteSpace(run))
      break;
  }
  return offset2;
};
const trailingPositions = (run) => {
  const glyphs = reverse(run.glyphs || []);
  const positions = reverse(run.positions || []);
  const leadingWhitespaces = glyphs.findIndex((g) => !isWhiteSpace$1(g));
  return leadingWhitespaces === -1 ? positions : positions.slice(0, leadingWhitespaces);
};
const trailingOffset$1 = (run) => {
  if (!run)
    return 0;
  const positions = trailingPositions(run);
  return positions.reduce((acc, pos) => acc + (pos.xAdvance || 0), 0);
};
const trailingOffset = (attributedString) => {
  const runs = attributedString.runs || [];
  let offset2 = 0;
  for (let i = runs.length - 1; i >= 0; i -= 1) {
    const run = runs[i];
    offset2 += trailingOffset$1(run);
    if (!isWhiteSpace(run))
      break;
  }
  return offset2;
};
const dropLast$1 = (run) => {
  return slice$1(0, run.end - run.start - 1, run);
};
const dropLast = (attributedString) => {
  const string = dropLast$2(attributedString.string);
  const runs = adjust(-1, dropLast$1, attributedString.runs);
  return Object.assign({}, attributedString, { string, runs });
};
const ALIGNMENT_FACTORS = { center: 0.5, right: 1 };
const removeNewLine = (line) => {
  return last(line.string) === "\n" ? dropLast(line) : line;
};
const getOverflowLeft = (line) => {
  return leadingOffset(line) + (line.overflowLeft || 0);
};
const getOverflowRight = (line) => {
  return trailingOffset(line) + (line.overflowRight || 0);
};
const adjustOverflow = (line) => {
  const overflowLeft = getOverflowLeft(line);
  const overflowRight = getOverflowRight(line);
  const x = line.box.x - overflowLeft;
  const width = line.box.width + overflowLeft + overflowRight;
  const box = Object.assign({}, line.box, { x, width });
  return Object.assign({}, line, { box, overflowLeft, overflowRight });
};
const justifyLine$1 = (engines, options, align) => {
  return (line) => {
    const lineWidth = advanceWidth(line);
    const alignFactor = ALIGNMENT_FACTORS[align] || 0;
    const remainingWidth = Math.max(0, line.box.width - lineWidth);
    const shouldJustify = align === "justify" || lineWidth > line.box.width;
    const x = line.box.x + remainingWidth * alignFactor;
    const box = Object.assign({}, line.box, { x });
    const newLine = Object.assign({}, line, { box });
    return shouldJustify ? engines.justification(options)(newLine) : newLine;
  };
};
const finalizeLine = (line) => {
  let lineAscent = 0;
  let lineDescent = 0;
  let lineHeight = 0;
  let lineXAdvance = 0;
  const runs = line.runs.map((run) => {
    const height2 = height$1(run);
    const ascent2 = ascent$1(run);
    const descent$1 = descent(run);
    const xAdvance = advanceWidth$1(run);
    lineHeight = Math.max(lineHeight, height2);
    lineAscent = Math.max(lineAscent, ascent2);
    lineDescent = Math.max(lineDescent, descent$1);
    lineXAdvance += xAdvance;
    return Object.assign({}, run, { height: height2, ascent: ascent2, descent: descent$1, xAdvance });
  });
  return Object.assign({}, line, {
    runs,
    height: lineHeight,
    ascent: lineAscent,
    descent: lineDescent,
    xAdvance: lineXAdvance
  });
};
const finalizeBlock = (engines, options) => {
  return (line, index, lines) => {
    const isLastFragment = index === lines.length - 1;
    const style = line.runs?.[0]?.attributes || {};
    const align = isLastFragment ? style.alignLastLine : style.align;
    return compose(finalizeLine, engines.textDecoration(), justifyLine$1(engines, options, align), adjustOverflow, removeNewLine)(line);
  };
};
const finalizeFragments = (engines, options) => {
  return (paragraphs) => {
    const blockFinalizer = finalizeBlock(engines, options);
    return paragraphs.map((paragraph) => paragraph.map(blockFinalizer));
  };
};
const ATTACHMENT_CODE = 65532;
const isReplaceGlyph = (glyph) => glyph.codePoints.includes(ATTACHMENT_CODE);
const resolveRunAttachments = (run) => {
  if (!run.positions)
    return run;
  const glyphs = run.glyphs || [];
  const attachment = run.attributes?.attachment;
  if (!attachment)
    return run;
  const positions = run.positions.map((position, i) => {
    const glyph = glyphs[i];
    if (attachment.width && isReplaceGlyph(glyph)) {
      return Object.assign({}, position, { xAdvance: attachment.width });
    }
    return Object.assign({}, position);
  });
  return Object.assign({}, run, { positions });
};
const resolveAttachments = () => {
  return (attributedString) => {
    const runs = attributedString.runs.map(resolveRunAttachments);
    const res = Object.assign({}, attributedString, { runs });
    return res;
  };
};
const applyAttributes = (a) => {
  return {
    align: a.align || (a.direction === "rtl" ? "right" : "left"),
    alignLastLine: a.alignLastLine || (a.align === "justify" ? "left" : a.align || "left"),
    attachment: a.attachment || null,
    backgroundColor: a.backgroundColor || null,
    bullet: a.bullet || null,
    characterSpacing: a.characterSpacing || 0,
    color: a.color || "black",
    direction: a.direction || "ltr",
    features: a.features || [],
    fill: a.fill !== false,
    font: a.font || [],
    fontSize: a.fontSize || 12,
    hangingPunctuation: a.hangingPunctuation || false,
    hyphenationFactor: a.hyphenationFactor || 0,
    indent: a.indent || 0,
    justificationFactor: a.justificationFactor || 1,
    lineHeight: a.lineHeight || null,
    lineSpacing: a.lineSpacing || 0,
    link: a.link || null,
    marginLeft: a.marginLeft || a.margin || 0,
    marginRight: a.marginRight || a.margin || 0,
    opacity: a.opacity,
    paddingTop: a.paddingTop || a.padding || 0,
    paragraphSpacing: a.paragraphSpacing || 0,
    script: a.script || null,
    shrinkFactor: a.shrinkFactor || 0,
    strike: a.strike || false,
    strikeColor: a.strikeColor || a.color || "black",
    strikeStyle: a.strikeStyle || "solid",
    stroke: a.stroke || false,
    underline: a.underline || false,
    underlineColor: a.underlineColor || a.color || "black",
    underlineStyle: a.underlineStyle || "solid",
    verticalAlign: a.verticalAlign || null,
    wordSpacing: a.wordSpacing || 0,
    yOffset: a.yOffset || 0
  };
};
const applyRunStyles = (run) => {
  const attributes = applyAttributes(run.attributes);
  return Object.assign({}, run, { attributes });
};
const applyDefaultStyles = () => {
  return (attributedString) => {
    const string = attributedString.string || "";
    const runs = (attributedString.runs || []).map(applyRunStyles);
    return { string, runs };
  };
};
const verticalAlignment = () => {
  return (attributedString) => {
    attributedString.runs.forEach((run) => {
      const { attributes } = run;
      const { verticalAlign } = attributes;
      if (verticalAlign === "sub") {
        attributes.yOffset = -0.2;
      } else if (verticalAlign === "super") {
        attributes.yOffset = 0.4;
      }
    });
    return attributedString;
  };
};
const bidi$1 = bidiFactory();
const getBidiLevels = (runs) => {
  return runs.reduce((acc, run) => {
    const length2 = run.end - run.start;
    const levels = repeat(run.attributes.bidiLevel, length2);
    return acc.concat(levels);
  }, []);
};
const mirrorString = () => {
  return (attributedString) => {
    const levels = getBidiLevels(attributedString.runs);
    let updatedString = "";
    attributedString.string.split("").forEach((char, index) => {
      const isRTL = levels[index] % 2 === 1;
      const mirroredChar = isRTL ? bidi$1.getMirroredCharacter(attributedString.string.charAt(index)) : null;
      updatedString += mirroredChar || char;
    });
    const result = {
      ...attributedString,
      string: updatedString
    };
    return result;
  };
};
const layoutEngine = (engines) => {
  return (attributedString, container, options = {}) => {
    const processParagraph = compose(resolveYOffset(), resolveAttachments(), verticalAlignment(), generateGlyphs(), wrapWords(engines, options), mirrorString(), preprocessRuns(engines));
    const processParagraphs = (paragraphs) => paragraphs.map(processParagraph);
    return compose(finalizeFragments(engines, options), bidiReordering(), typesetter(engines, options, container), processParagraphs, splitParagraphs(), applyDefaultStyles(), decomposeUnicode())(attributedString);
  };
};
const bidi = bidiFactory();
const bidiEngine = () => {
  return (attributedString) => {
    const { string } = attributedString;
    const direction = attributedString.runs[0]?.attributes.direction;
    const { levels } = bidi.getEmbeddingLevels(string, direction);
    let lastLevel = null;
    let lastIndex = 0;
    let index = 0;
    const runs = [];
    for (let i = 0; i < levels.length; i += 1) {
      const level = levels[i];
      if (level !== lastLevel) {
        if (lastLevel !== null) {
          runs.push({
            start: lastIndex,
            end: index,
            attributes: { bidiLevel: lastLevel }
          });
        }
        lastIndex = index;
        lastLevel = level;
      }
      index += 1;
    }
    if (lastIndex < string.length) {
      runs.push({
        start: lastIndex,
        end: string.length,
        attributes: { bidiLevel: lastLevel }
      });
    }
    const result = { string, runs };
    return result;
  };
};
const INFINITY = 1e4;
const skipPastGlueAndPenalty = (nodes, start2) => {
  let j = start2 + 1;
  for (; j < nodes.length; j++) {
    if (nodes[j].type !== "glue" && nodes[j].type !== "penalty") {
      break;
    }
  }
  return nodes[j - 1];
};
const getNextBreakpoint = (subnodes, widths, lineNumber) => {
  let position = null;
  let minimumBadness = Infinity;
  const sum = { width: 0, stretch: 0, shrink: 0 };
  const lineLength = widths[Math.min(lineNumber, widths.length - 1)];
  const calculateRatio = (node) => {
    const stretch = "stretch" in node ? node.stretch : null;
    if (sum.width < lineLength) {
      if (!stretch)
        return INFINITY;
      return sum.stretch - stretch > 0 ? (lineLength - sum.width) / sum.stretch : INFINITY;
    }
    const shrink = "shrink" in node ? node.shrink : null;
    if (sum.width > lineLength) {
      if (!shrink)
        return INFINITY;
      return sum.shrink - shrink > 0 ? (lineLength - sum.width) / sum.shrink : INFINITY;
    }
    return 0;
  };
  let hyphenWidth = 0;
  for (let i = 0; i < subnodes.length; i += 1) {
    const node = subnodes[i];
    if (node.type === "box") {
      sum.width += node.width;
    }
    if (node.type === "glue") {
      sum.width += node.width;
      sum.stretch += node.stretch;
      sum.shrink += node.shrink;
    }
    const potentialEndOfLine = skipPastGlueAndPenalty(subnodes, i);
    hyphenWidth = potentialEndOfLine.type === "penalty" ? potentialEndOfLine.width : 0;
    if (sum.width - sum.shrink + hyphenWidth > lineLength) {
      if (position === null) {
        let j = i === 0 ? i + 1 : i;
        while (j < subnodes.length && (subnodes[j].type === "glue" || subnodes[j].type === "penalty")) {
          j++;
        }
        position = j - 1;
      }
      break;
    }
    if (node.type === "penalty" || node.type === "glue") {
      const ratio = calculateRatio(node);
      const penalty = node.type === "penalty" ? node.penalty : 0;
      const badness = 100 * Math.abs(ratio) ** 3 + penalty;
      if (minimumBadness >= badness) {
        position = i;
        minimumBadness = badness;
      }
    }
  }
  return sum.width - sum.shrink + hyphenWidth > lineLength ? position : null;
};
const applyBestFit = (nodes, widths) => {
  let count = 0;
  let lineNumber = 0;
  let subnodes = nodes;
  const breakpoints = [0];
  while (subnodes.length > 0) {
    const breakpoint2 = getNextBreakpoint(subnodes, widths, lineNumber);
    if (breakpoint2 !== null) {
      count += breakpoint2;
      breakpoints.push(count);
      subnodes = subnodes.slice(breakpoint2 + 1, subnodes.length);
      count++;
      lineNumber++;
    } else {
      subnodes = [];
    }
  }
  return breakpoints;
};
class LinkedListNode {
  data;
  prev;
  next;
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}
class LinkedList {
  static Node = LinkedListNode;
  head;
  tail;
  listSize;
  listLength;
  constructor() {
    this.head = null;
    this.tail = null;
    this.listSize = 0;
    this.listLength = 0;
  }
  isLinked(node) {
    return !(node && node.prev === null && node.next === null && this.tail !== node && this.head !== node || this.isEmpty());
  }
  size() {
    return this.listSize;
  }
  isEmpty() {
    return this.listSize === 0;
  }
  first() {
    return this.head;
  }
  last() {
    return this.last;
  }
  forEach(callback) {
    let node = this.head;
    while (node !== null) {
      callback(node);
      node = node.next;
    }
  }
  at(i) {
    let node = this.head;
    let index = 0;
    if (i >= this.listLength || i < 0) {
      return null;
    }
    while (node !== null) {
      if (i === index) {
        return node;
      }
      node = node.next;
      index += 1;
    }
    return null;
  }
  insertAfter(node, newNode) {
    if (!this.isLinked(node))
      return this;
    newNode.prev = node;
    newNode.next = node.next;
    if (node.next === null) {
      this.tail = newNode;
    } else {
      node.next.prev = newNode;
    }
    node.next = newNode;
    this.listSize += 1;
    return this;
  }
  insertBefore(node, newNode) {
    if (!this.isLinked(node))
      return this;
    newNode.prev = node.prev;
    newNode.next = node;
    if (node.prev === null) {
      this.head = newNode;
    } else {
      node.prev.next = newNode;
    }
    node.prev = newNode;
    this.listSize += 1;
    return this;
  }
  push(node) {
    if (this.head === null) {
      this.unshift(node);
    } else {
      this.insertAfter(this.tail, node);
    }
    return this;
  }
  unshift(node) {
    if (this.head === null) {
      this.head = node;
      this.tail = node;
      node.prev = null;
      node.next = null;
      this.listSize += 1;
    } else {
      this.insertBefore(this.head, node);
    }
    return this;
  }
  remove(node) {
    if (!this.isLinked(node))
      return this;
    if (node.prev === null) {
      this.head = node.next;
    } else {
      node.prev.next = node.next;
    }
    if (node.next === null) {
      this.tail = node.prev;
    } else {
      node.next.prev = node.prev;
    }
    this.listSize -= 1;
    return this;
  }
}
function breakpoint(position, demerits, line, fitnessClass, totals, previous) {
  return {
    position,
    demerits,
    line,
    fitnessClass,
    totals: totals || {
      width: 0,
      stretch: 0,
      shrink: 0
    },
    previous
  };
}
function computeCost(nodes, lineLengths, sum, end2, active, currentLine) {
  let width = sum.width - active.totals.width;
  let stretch = 0;
  let shrink = 0;
  const lineLength = currentLine < lineLengths.length ? lineLengths[currentLine - 1] : lineLengths[lineLengths.length - 1];
  if (nodes[end2].type === "penalty") {
    width += nodes[end2].width;
  }
  if (width < lineLength) {
    stretch = sum.stretch - active.totals.stretch;
    if (stretch > 0) {
      return (lineLength - width) / stretch;
    }
    return linebreak.infinity;
  }
  if (width > lineLength) {
    shrink = sum.shrink - active.totals.shrink;
    if (shrink > 0) {
      return (lineLength - width) / shrink;
    }
    return linebreak.infinity;
  }
  return 0;
}
function computeSum(nodes, sum, breakPointIndex) {
  const result = {
    width: sum.width,
    stretch: sum.stretch,
    shrink: sum.shrink
  };
  for (let i = breakPointIndex; i < nodes.length; i += 1) {
    const node = nodes[i];
    if (node.type === "glue") {
      result.width += node.width;
      result.stretch += node.stretch;
      result.shrink += node.shrink;
    } else if (node.type === "box" || node.type === "penalty" && node.penalty === -linebreak.infinity && i > breakPointIndex) {
      break;
    }
  }
  return result;
}
function findBestBreakpoints(activeNodes) {
  const breakpoints = [];
  if (activeNodes.size() === 0)
    return [];
  let tmp = { data: { demerits: Infinity } };
  activeNodes.forEach((node) => {
    if (node.data.demerits < tmp.data.demerits) {
      tmp = node;
    }
  });
  while (tmp !== null) {
    breakpoints.push(tmp.data.position);
    tmp = tmp.data.previous;
  }
  return breakpoints.reverse();
}
const linebreak = (nodes, availableWidths, tolerance) => {
  const options = {
    demerits: { line: 10, flagged: 100, fitness: 3e3 },
    tolerance: tolerance || 3
  };
  const activeNodes = new LinkedList();
  const sum = { width: 0, stretch: 0, shrink: 0 };
  const lineLengths = availableWidths;
  activeNodes.push(new LinkedList.Node(breakpoint(0, 0, 0, 0, void 0, null)));
  function mainLoop(node, index, nodes2) {
    let active = activeNodes.first();
    while (active !== null) {
      let currentLine = 0;
      const candidates = [
        { active: void 0, demerits: Infinity },
        { active: void 0, demerits: Infinity },
        { active: void 0, demerits: Infinity },
        { active: void 0, demerits: Infinity }
      ];
      while (active !== null) {
        currentLine = active.data.line + 1;
        const ratio = computeCost(nodes2, lineLengths, sum, index, active.data, currentLine);
        if (ratio < -1 || node.type === "penalty" && node.penalty === -linebreak.infinity) {
          activeNodes.remove(active);
        }
        if (ratio >= -1 && ratio <= options.tolerance) {
          const badness = 100 * Math.pow(Math.abs(ratio), 3);
          let demerits = 0;
          if (node.type === "penalty" && node.penalty >= 0) {
            demerits = Math.pow(options.demerits.line + badness, 2) + Math.pow(node.penalty, 2);
          } else if (node.type === "penalty" && node.penalty !== -linebreak.infinity) {
            demerits = Math.pow(options.demerits.line + badness, 2) - Math.pow(node.penalty, 2);
          } else {
            demerits = Math.pow(options.demerits.line + badness, 2);
          }
          if (node.type === "penalty" && nodes2[active.data.position].type === "penalty") {
            demerits += options.demerits.flagged * node.flagged * // @ts-expect-error node is penalty here
            nodes2[active.data.position].flagged;
          }
          let currentClass;
          if (ratio < -0.5) {
            currentClass = 0;
          } else if (ratio <= 0.5) {
            currentClass = 1;
          } else if (ratio <= 1) {
            currentClass = 2;
          } else {
            currentClass = 3;
          }
          if (Math.abs(currentClass - active.data.fitnessClass) > 1) {
            demerits += options.demerits.fitness;
          }
          demerits += active.data.demerits;
          if (demerits < candidates[currentClass].demerits) {
            candidates[currentClass] = { active, demerits };
          }
        }
        active = active.next;
        if (active !== null && active.data.line >= currentLine) {
          break;
        }
      }
      const tmpSum = computeSum(nodes2, sum, index);
      for (let fitnessClass = 0; fitnessClass < candidates.length; fitnessClass += 1) {
        const candidate = candidates[fitnessClass];
        if (candidate.demerits === Infinity)
          continue;
        const newNode = new LinkedList.Node(breakpoint(index, candidate.demerits, candidate.active.data.line + 1, fitnessClass, tmpSum, candidate.active));
        if (active !== null) {
          activeNodes.insertBefore(active, newNode);
        } else {
          activeNodes.push(newNode);
        }
      }
    }
  }
  nodes.forEach((node, index, nodes2) => {
    if (node.type === "box") {
      sum.width += node.width;
      return;
    }
    if (node.type === "glue") {
      const precedesBox = index > 0 && nodes2[index - 1].type === "box";
      if (precedesBox)
        mainLoop(node, index, nodes2);
      sum.width += node.width;
      sum.stretch += node.stretch;
      sum.shrink += node.shrink;
      return;
    }
    if (node.type === "penalty" && node.penalty !== linebreak.infinity) {
      mainLoop(node, index, nodes2);
    }
  });
  return findBestBreakpoints(activeNodes);
};
linebreak.infinity = 1e4;
linebreak.glue = (width, start2, end2, stretch, shrink) => ({
  type: "glue",
  start: start2,
  end: end2,
  width,
  stretch,
  shrink
});
linebreak.box = (width, start2, end2, hyphenated = false) => ({
  type: "box",
  width,
  start: start2,
  end: end2,
  hyphenated
});
linebreak.penalty = (width, penalty, flagged) => ({
  type: "penalty",
  width,
  penalty,
  flagged
});
const add = (index, run) => {
  const start2 = run.start + index;
  const end2 = run.end + index;
  return Object.assign({}, run, { start: start2, end: end2 });
};
const length = (run) => {
  return run.end - run.start;
};
const concatStringIndices = (runA, runB) => {
  const runAIndices = runA.stringIndices || [];
  const runALastIndex = last(runAIndices) || 0;
  const runBIndices = (runB.stringIndices || []).map((i) => i + runALastIndex + 1);
  return normalize(runAIndices.concat(runBIndices));
};
const concatGlyphIndices = (runA, runB) => {
  const runAIndices = runA.glyphIndices || [];
  const runALength = runA.stringIndices?.length || 0;
  const runBIndices = (runB.glyphIndices || []).map((i) => i + runALength);
  return normalize(runAIndices.concat(runBIndices));
};
const concat = (runA, runB) => {
  const end2 = runA.end + length(runB);
  const glyphs = (runA.glyphs || []).concat(runB.glyphs || []);
  const positions = (runA.positions || []).concat(runB.positions || []);
  const attributes = Object.assign({}, runA.attributes, runB.attributes);
  const stringIndices = concatStringIndices(runA, runB);
  const glyphIndices = concatGlyphIndices(runA, runB);
  return Object.assign({}, runA, {
    end: end2,
    glyphs,
    positions,
    attributes,
    stringIndices,
    glyphIndices
  });
};
const insertGlyph$1 = (index, glyph, run) => {
  if (!glyph)
    return run;
  const leadingRun = slice$1(0, index, run);
  const trailingRun = slice$1(index, Infinity, run);
  return concat(append$1(glyph, leadingRun), trailingRun);
};
const insert = (index, value, run) => {
  const font = getFont(run);
  const glyph = isNumber(value) ? fromCodePoint(value, font) : value;
  return insertGlyph$1(index, glyph, run);
};
const runIndexAt = (index, attributedString) => {
  return runIndexAt$1(index, attributedString.runs);
};
const insertGlyph = (index, glyph, attributedString) => {
  const runIndex = runIndexAt(index, attributedString);
  if (runIndex === -1)
    return append(glyph, attributedString);
  const codePoints = [glyph];
  const string = attributedString.string.slice(0, index) + stringFromCodePoints(codePoints) + attributedString.string.slice(index);
  const runs = attributedString.runs.map((run, i) => {
    if (i === runIndex)
      return insert(index - run.start, glyph, run);
    if (i > runIndex)
      return add(codePoints.length, run);
    return run;
  });
  return Object.assign({}, attributedString, { string, runs });
};
const advanceWidthBetween$1 = (start2, end2, run) => {
  const runStart = run.start || 0;
  const glyphStartIndex = Math.max(0, glyphIndexAt(start2 - runStart, run));
  const glyphEndIndex = Math.max(0, glyphIndexAt(end2 - runStart, run));
  const positions = (run.positions || []).slice(glyphStartIndex, glyphEndIndex);
  return advanceWidth$2(positions);
};
const advanceWidthBetween = (start2, end2, attributedString) => {
  const runs = filter(start2, end2, attributedString.runs);
  return runs.reduce((acc, run) => acc + advanceWidthBetween$1(start2, end2, run), 0);
};
const HYPHEN = 45;
const TOLERANCE_STEPS = 5;
const TOLERANCE_LIMIT = 50;
const opts = {
  width: 3,
  stretch: 6,
  shrink: 9
};
const breakLines = (attributedString, nodes, breaks) => {
  let start2 = 0;
  let end2 = null;
  const lines = breaks.reduce((acc, breakPoint) => {
    const node = nodes[breakPoint];
    const prevNode = nodes[breakPoint - 1];
    if (breakPoint === nodes.length - 1)
      return acc;
    let line;
    if (node.type === "penalty") {
      end2 = prevNode.end;
      line = slice(start2, end2, attributedString);
      line = insertGlyph(line.string.length, HYPHEN, line);
    } else {
      end2 = node.end;
      line = slice(start2, end2, attributedString);
    }
    start2 = end2;
    return [...acc, line];
  }, []);
  lines.push(slice(start2, attributedString.string.length, attributedString));
  return lines;
};
const getNodes = (attributedString, { align }, options) => {
  let start2 = 0;
  const hyphenWidth = 5;
  const { syllables } = attributedString;
  const hyphenPenalty = options.hyphenationPenalty || (align === "justify" ? 100 : 600);
  const result = syllables.reduce((acc, s, index) => {
    const width = advanceWidthBetween(start2, start2 + s.length, attributedString);
    if (s.trim() === "") {
      const stretch = width * opts.width / opts.stretch;
      const shrink = width * opts.width / opts.shrink;
      const end2 = start2 + s.length;
      acc.push(linebreak.glue(width, start2, end2, stretch, shrink));
    } else {
      const hyphenated = syllables[index + 1] !== " ";
      const end2 = start2 + s.length;
      acc.push(linebreak.box(width, start2, end2, hyphenated));
      if (syllables[index + 1] && hyphenated) {
        acc.push(linebreak.penalty(hyphenWidth, hyphenPenalty, 1));
      }
    }
    start2 += s.length;
    return acc;
  }, []);
  result.push(linebreak.glue(0, start2, start2, linebreak.infinity, 0));
  result.push(linebreak.penalty(0, -linebreak.infinity, 1));
  return result;
};
const getAttributes = (attributedString) => {
  return attributedString.runs?.[0]?.attributes || {};
};
const linebreaker = (options) => {
  return (attributedString, availableWidths) => {
    let tolerance = options.tolerance || 4;
    const attributes = getAttributes(attributedString);
    const nodes = getNodes(attributedString, attributes, options);
    let breaks = linebreak(nodes, availableWidths, tolerance);
    while (breaks.length === 0 && tolerance < TOLERANCE_LIMIT) {
      tolerance += TOLERANCE_STEPS;
      breaks = linebreak(nodes, availableWidths, tolerance);
    }
    if (breaks.length === 0 || breaks.length === 1 && breaks[0] === 0) {
      breaks = applyBestFit(nodes, availableWidths);
    }
    return breakLines(attributedString, nodes, breaks.slice(1));
  };
};
var Direction;
(function(Direction2) {
  Direction2[Direction2["GROW"] = 0] = "GROW";
  Direction2[Direction2["SHRINK"] = 1] = "SHRINK";
})(Direction || (Direction = {}));
const WHITESPACE_PRIORITY = 1;
const LETTER_PRIORITY = 2;
const EXPAND_WHITESPACE_FACTOR = {
  before: 0.5,
  after: 0.5,
  priority: WHITESPACE_PRIORITY,
  unconstrained: false
};
const EXPAND_CHAR_FACTOR = {
  before: 0.14453125,
  // 37/256
  after: 0.14453125,
  priority: LETTER_PRIORITY,
  unconstrained: false
};
const SHRINK_WHITESPACE_FACTOR = {
  before: -0.04296875,
  // -11/256
  after: -0.04296875,
  priority: WHITESPACE_PRIORITY,
  unconstrained: false
};
const SHRINK_CHAR_FACTOR = {
  before: -0.04296875,
  after: -0.04296875,
  priority: LETTER_PRIORITY,
  unconstrained: false
};
const getCharFactor = (direction, options) => {
  const expandCharFactor = options.expandCharFactor || {};
  const shrinkCharFactor = options.shrinkCharFactor || {};
  return direction === Direction.GROW ? Object.assign({}, EXPAND_CHAR_FACTOR, expandCharFactor) : Object.assign({}, SHRINK_CHAR_FACTOR, shrinkCharFactor);
};
const getWhitespaceFactor = (direction, options) => {
  const expandWhitespaceFactor = options.expandWhitespaceFactor || {};
  const shrinkWhitespaceFactor = options.shrinkWhitespaceFactor || {};
  return direction === Direction.GROW ? Object.assign({}, EXPAND_WHITESPACE_FACTOR, expandWhitespaceFactor) : Object.assign({}, SHRINK_WHITESPACE_FACTOR, shrinkWhitespaceFactor);
};
const factor = (direction, options) => (glyphs) => {
  const charFactor = getCharFactor(direction, options);
  const whitespaceFactor = getWhitespaceFactor(direction, options);
  const factors = [];
  for (let index = 0; index < glyphs.length; index += 1) {
    let f;
    const glyph = glyphs[index];
    if (isWhiteSpace$1(glyph)) {
      f = Object.assign({}, whitespaceFactor);
      if (index === glyphs.length - 1) {
        f.before = 0;
        if (index > 0) {
          factors[index - 1].after = 0;
        }
      }
    } else if (glyph.isMark && index > 0) {
      f = Object.assign({}, factors[index - 1]);
      f.before = 0;
      factors[index - 1].after = 0;
    } else {
      f = Object.assign({}, charFactor);
    }
    factors.push(f);
  }
  return factors;
};
const getFactors = (gap, line, options) => {
  const direction = gap > 0 ? Direction.GROW : Direction.SHRINK;
  const getFactor = factor(direction, options);
  const factors = line.runs.reduce((acc, run) => {
    return acc.concat(getFactor(run.glyphs));
  }, []);
  factors[0].before = 0;
  factors[factors.length - 1].after = 0;
  return factors;
};
const KASHIDA_PRIORITY = 0;
const NULL_PRIORITY = 3;
const getDistances = (gap, factors) => {
  let total = 0;
  const priorities = [];
  const unconstrained = [];
  for (let priority2 = KASHIDA_PRIORITY; priority2 <= NULL_PRIORITY; priority2 += 1) {
    priorities[priority2] = unconstrained[priority2] = 0;
  }
  for (let j = 0; j < factors.length; j += 1) {
    const f = factors[j];
    const sum = f.before + f.after;
    total += sum;
    priorities[f.priority] += sum;
    if (f.unconstrained) {
      unconstrained[f.priority] += sum;
    }
  }
  let highestPriority = -1;
  let highestPrioritySum = 0;
  let remainingGap = gap;
  let priority;
  for (priority = KASHIDA_PRIORITY; priority <= NULL_PRIORITY; priority += 1) {
    const prioritySum = priorities[priority];
    if (prioritySum !== 0) {
      if (highestPriority === -1) {
        highestPriority = priority;
        highestPrioritySum = prioritySum;
      }
      if (Math.abs(remainingGap) <= Math.abs(prioritySum)) {
        priorities[priority] = remainingGap / prioritySum;
        unconstrained[priority] = 0;
        remainingGap = 0;
        break;
      }
      priorities[priority] = 1;
      remainingGap -= prioritySum;
      if (unconstrained[priority] !== 0) {
        unconstrained[priority] = remainingGap / unconstrained[priority];
        remainingGap = 0;
        break;
      }
    }
  }
  for (let p = priority + 1; p <= NULL_PRIORITY; p += 1) {
    priorities[p] = 0;
    unconstrained[p] = 0;
  }
  if (remainingGap > 0 && highestPriority > -1) {
    priorities[highestPriority] = (highestPrioritySum + (gap - total)) / highestPrioritySum;
  }
  const distances = [];
  for (let index = 0; index < factors.length; index += 1) {
    const f = factors[index];
    const next = factors[index + 1];
    let dist = f.after * priorities[f.priority];
    if (next) {
      dist += next.before * priorities[next.priority];
    }
    if (f.unconstrained) {
      dist += f.after * unconstrained[f.priority];
      if (next) {
        dist += next.before * unconstrained[next.priority];
      }
    }
    distances.push(dist);
  }
  return distances;
};
const justifyLine = (distances, line) => {
  let index = 0;
  for (const run of line.runs) {
    for (const position of run.positions) {
      position.xAdvance += distances[index++];
    }
  }
  return line;
};
const justification = (options) => {
  return (line) => {
    const gap = line.box.width - advanceWidth(line);
    if (gap === 0)
      return line;
    const factors = getFactors(gap, line, options);
    const distances = getDistances(gap, factors);
    return justifyLine(distances, line);
  };
};
const ascent = (attributedString) => {
  const reducer = (acc, run) => Math.max(acc, ascent$1(run));
  return attributedString.runs.reduce(reducer, 0);
};
const BASE_FONT_SIZE = 12;
const textDecoration = () => (line) => {
  let x = line.overflowLeft || 0;
  const overflowRight = line.overflowRight || 0;
  const maxX = advanceWidth(line) - overflowRight;
  line.decorationLines = [];
  for (let i = 0; i < line.runs.length; i += 1) {
    const run = line.runs[i];
    const width = Math.min(maxX - x, advanceWidth$1(run));
    const thickness = Math.max(0.5, Math.floor(run.attributes.fontSize / BASE_FONT_SIZE));
    if (run.attributes.underline) {
      const rect = {
        x,
        y: ascent(line) + thickness * 2,
        width,
        height: thickness
      };
      const decorationLine = {
        rect,
        opacity: run.attributes.opacity,
        color: run.attributes.underlineColor || "black",
        style: run.attributes.underlineStyle || "solid"
      };
      line.decorationLines.push(decorationLine);
    }
    if (run.attributes.strike) {
      const y = ascent(line) - ascent$1(run) / 3;
      const rect = { x, y, width, height: thickness };
      const decorationLine = {
        rect,
        opacity: run.attributes.opacity,
        color: run.attributes.strikeColor || "black",
        style: run.attributes.strikeStyle || "solid"
      };
      line.decorationLines.push(decorationLine);
    }
    x += width;
  }
  return line;
};
const ignoredScripts = ["Common", "Inherited", "Unknown"];
const scriptItemizer = () => {
  return (attributedString) => {
    const { string } = attributedString;
    let lastScript = "Unknown";
    let lastIndex = 0;
    let index = 0;
    const runs = [];
    if (!string)
      return empty();
    for (let i = 0; i < string.length; i += 1) {
      const char = string[i];
      const codePoint = char.codePointAt(0);
      const script = $747425b437e121da$export$2e2bcd8739ae039.getScript(codePoint);
      if (script !== lastScript && !ignoredScripts.includes(script)) {
        if (lastScript !== "Unknown") {
          runs.push({
            start: lastIndex,
            end: index,
            attributes: { script: lastScript }
          });
        }
        lastIndex = index;
        lastScript = script;
      }
      index += char.length;
    }
    if (lastIndex < string.length) {
      runs.push({
        start: lastIndex,
        end: string.length,
        attributes: { script: lastScript }
      });
    }
    const result = { string, runs };
    return result;
  };
};
const SOFT_HYPHEN = "­";
const hyphenator = hyphen(pattern);
const splitHyphen = (word) => {
  return word.split(SOFT_HYPHEN);
};
const cache = {};
const getParts = (word) => {
  const base = word.includes(SOFT_HYPHEN) ? word : hyphenator(word);
  return splitHyphen(base);
};
const wordHyphenation = () => {
  return (word) => {
    const cacheKey = `_${word}`;
    if (isNil(word))
      return [];
    if (cache[cacheKey])
      return cache[cacheKey];
    cache[cacheKey] = getParts(word);
    return cache[cacheKey];
  };
};
const IGNORED_CODE_POINTS = [173];
const getFontSize = (run) => run.attributes.fontSize || 12;
const pickFontFromFontStack = (codePoint, fontStack, lastFont) => {
  if (IGNORED_CODE_POINTS.includes(codePoint))
    return lastFont;
  const fontStackWithFallback = [...fontStack, lastFont];
  for (let i = 0; i < fontStackWithFallback.length; i += 1) {
    const font = fontStackWithFallback[i];
    if (font && font.hasGlyphForCodePoint && font.hasGlyphForCodePoint(codePoint)) {
      return font;
    }
  }
  return fontStack.at(-1);
};
const fontSubstitution = () => ({ string, runs }) => {
  let lastFont = null;
  let lastFontSize = null;
  let lastIndex = 0;
  let index = 0;
  const res = [];
  for (let i = 0; i < runs.length; i += 1) {
    const run = runs[i];
    if (string.length === 0) {
      res.push({
        start: 0,
        end: 0,
        attributes: { font: run.attributes.font }
      });
      break;
    }
    const chars = string.slice(run.start, run.end);
    for (let j = 0; j < chars.length; j += 1) {
      const char = chars[j];
      const codePoint = char.codePointAt(0);
      const font = pickFontFromFontStack(codePoint, run.attributes.font, lastFont);
      const fontSize = getFontSize(run);
      if (font !== lastFont || fontSize !== lastFontSize || font.unitsPerEm !== lastFont?.unitsPerEm) {
        if (lastFont) {
          res.push({
            start: lastIndex,
            end: index,
            attributes: {
              font: [lastFont],
              scale: lastFontSize / lastFont.unitsPerEm
            }
          });
        }
        lastFont = font;
        lastFontSize = fontSize;
        lastIndex = index;
      }
      index += char.length;
    }
  }
  if (lastIndex < string.length) {
    const fontSize = getFontSize(last(runs));
    res.push({
      start: lastIndex,
      end: string.length,
      attributes: {
        font: [lastFont],
        scale: fontSize / lastFont.unitsPerEm
      }
    });
  }
  return { string, runs: res };
};
export {
  fontSubstitution as a,
  linebreaker as b,
  bidiEngine as c,
  fromFragments as f,
  justification as j,
  layoutEngine as l,
  scriptItemizer as s,
  textDecoration as t,
  wordHyphenation as w
};
