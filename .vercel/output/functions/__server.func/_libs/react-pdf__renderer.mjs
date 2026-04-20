import { F as FontStore } from "./react-pdf__font.mjs";
import { r as render } from "./react-pdf__render.mjs";
import { P as PDFDocument } from "./react-pdf__pdfkit.mjs";
import { l as layout } from "./react-pdf__layout.mjs";
import { u as upperFirst } from "./react-pdf__fns.mjs";
import { r as renderer$1 } from "./react-pdf__reconciler.mjs";
const omitNils = (object) => Object.fromEntries(Object.entries(object).filter((_ref) => {
  let [, value] = _ref;
  return value !== void 0;
}));
const createInstance = (type, _ref) => {
  let {
    style,
    children,
    ...props
  } = _ref;
  return {
    type,
    box: {},
    style: style || {},
    props: props || {},
    children: []
  };
};
const createTextInstance = (text) => ({
  type: "TEXT_INSTANCE",
  value: text
});
const appendChild = (parent, child) => {
  const isParentText = parent.type === "TEXT" || parent.type === "LINK" || parent.type === "TSPAN" || parent.type === "NOTE";
  const isChildTextInstance = child.type === "TEXT_INSTANCE";
  const isOrphanTextInstance = isChildTextInstance && !isParentText;
  if (isOrphanTextInstance) {
    console.warn(`Invalid '${child.value}' string child outside <Text> component`);
    return;
  }
  parent.children.push(child);
};
const appendChildToContainer = (parentInstance, child) => {
  if (parentInstance.type === "ROOT") {
    parentInstance.document = child;
  } else {
    appendChild(parentInstance, child);
  }
};
const insertBefore = (parentInstance, child, beforeChild) => {
  var _parentInstance$child;
  const index2 = (_parentInstance$child = parentInstance.children) === null || _parentInstance$child === void 0 ? void 0 : _parentInstance$child.indexOf(beforeChild);
  if (index2 === void 0) return;
  if (index2 !== -1 && child) parentInstance.children.splice(index2, 0, child);
};
const removeChild = (parentInstance, child) => {
  var _parentInstance$child2;
  const index2 = (_parentInstance$child2 = parentInstance.children) === null || _parentInstance$child2 === void 0 ? void 0 : _parentInstance$child2.indexOf(child);
  if (index2 === void 0) return;
  if (index2 !== -1) parentInstance.children.splice(index2, 1);
};
const removeChildFromContainer = (parentInstance, child) => {
  var _parentInstance$child3;
  const index2 = (_parentInstance$child3 = parentInstance.children) === null || _parentInstance$child3 === void 0 ? void 0 : _parentInstance$child3.indexOf(child);
  if (index2 === void 0) return;
  if (index2 !== -1) parentInstance.children.splice(index2, 1);
};
const commitTextUpdate = (textInstance, oldText, newText) => {
  textInstance.value = newText;
};
const commitUpdate = (instance, updatePayload, type, oldProps, newProps) => {
  const {
    style,
    ...props
  } = newProps;
  instance.props = props;
  instance.style = style;
};
const createRenderer = (_ref2) => {
  let {
    onChange = () => {
    }
  } = _ref2;
  return renderer$1({
    appendChild,
    appendChildToContainer,
    commitTextUpdate,
    commitUpdate,
    createInstance,
    createTextInstance,
    insertBefore,
    removeChild,
    removeChildFromContainer,
    resetAfterCommit: onChange
  });
};
const fontStore = new FontStore();
let renderer;
const events = {};
const pdf = (initialValue) => {
  const onChange = () => {
    var _events$change;
    const listeners = ((_events$change = events.change) === null || _events$change === void 0 ? void 0 : _events$change.slice()) || [];
    for (let i = 0; i < listeners.length; i += 1) listeners[i]();
  };
  const container = {
    type: "ROOT",
    document: null
  };
  renderer = renderer || createRenderer({
    onChange
  });
  const mountNode = renderer.createContainer(container);
  const updateContainer = (doc, callback) => {
    renderer.updateContainer(doc, mountNode, null, callback);
  };
  if (initialValue) updateContainer(initialValue);
  const render2 = async function(compress) {
    if (compress === void 0) {
      compress = true;
    }
    const props = container.document.props || {};
    const {
      pdfVersion,
      language,
      pageLayout,
      pageMode,
      title,
      author,
      subject,
      keywords,
      creator = "react-pdf",
      producer = "react-pdf",
      creationDate = /* @__PURE__ */ new Date(),
      modificationDate,
      ownerPassword,
      userPassword,
      permissions
    } = props;
    const ctx = new PDFDocument({
      compress,
      pdfVersion,
      lang: language,
      displayTitle: true,
      autoFirstPage: false,
      ownerPassword,
      userPassword,
      permissions,
      pageLayout,
      info: omitNils({
        Title: title,
        Author: author,
        Subject: subject,
        Keywords: keywords,
        Creator: creator,
        Producer: producer,
        CreationDate: creationDate,
        ModificationDate: modificationDate
      })
    });
    if (pageMode) {
      ctx._root.data.PageMode = upperFirst(pageMode);
    }
    const layout$1 = await layout(container.document, fontStore);
    const fileStream = render(ctx, layout$1);
    return {
      layout: layout$1,
      fileStream
    };
  };
  const callOnRender = function(params) {
    if (params === void 0) {
      params = {};
    }
    if (container.document.props.onRender) {
      container.document.props.onRender(params);
    }
  };
  const toBlob = async () => {
    const chunks = [];
    const {
      layout: _INTERNAL__LAYOUT__DATA_,
      fileStream: instance
    } = await render2();
    return new Promise((resolve, reject) => {
      instance.on("data", (chunk) => {
        chunks.push(chunk instanceof Uint8Array ? chunk : new Uint8Array(chunk));
      });
      instance.on("end", () => {
        try {
          const blob = new Blob(chunks, {
            type: "application/pdf"
          });
          callOnRender({
            blob,
            _INTERNAL__LAYOUT__DATA_
          });
          resolve(blob);
        } catch (error) {
          reject(error);
        }
      });
    });
  };
  const toBuffer = async () => {
    const {
      layout: _INTERNAL__LAYOUT__DATA_,
      fileStream
    } = await render2();
    callOnRender({
      _INTERNAL__LAYOUT__DATA_
    });
    return fileStream;
  };
  const toString = async () => {
    let result = "";
    const {
      fileStream: instance
    } = await render2(false);
    return new Promise((resolve, reject) => {
      try {
        instance.on("data", (buffer) => {
          result += buffer;
        });
        instance.on("end", () => {
          callOnRender();
          resolve(result);
        });
      } catch (error) {
        reject(error);
      }
    });
  };
  const on = (event, listener) => {
    if (!events[event]) events[event] = [];
    events[event].push(listener);
  };
  const removeListener = (event, listener) => {
    if (!events[event]) return;
    const idx = events[event].indexOf(listener);
    if (idx > -1) events[event].splice(idx, 1);
  };
  return {
    on,
    container,
    toBlob,
    toBuffer,
    toString,
    removeListener,
    updateContainer
  };
};
const StyleSheet = {
  create: (s) => s
};
const throwEnvironmentError = (name) => {
  throw new Error(`${name} is a web specific API. You're either using this component on Node, or your bundler is not loading react-pdf from the appropriate web build.`);
};
const usePDF = () => {
  throwEnvironmentError("usePDF");
};
export {
  StyleSheet as S,
  pdf as p,
  usePDF as u
};
