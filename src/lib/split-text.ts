// minimal word-aware splitter. Walks child nodes:
// - text nodes are split on whitespace, each word becomes overflow-hidden + .word inner
// - element nodes are wrapped as a single "word" so italics / accent spans survive
export const SplitText = {
  split(el: HTMLElement) {
    if (el.dataset.split === "done") return;
    const frag = document.createDocumentFragment();

    const wrapWord = (content: Node) => {
      const outer = document.createElement("span");
      outer.style.display = "inline-block";
      outer.style.overflow = "hidden";
      outer.style.verticalAlign = "bottom";
      const inner = document.createElement("span");
      inner.className = "word";
      inner.style.display = "inline-block";
      inner.style.willChange = "transform";
      inner.appendChild(content);
      outer.appendChild(inner);
      return outer;
    };

    el.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent ?? "";
        text.split(/(\s+)/).forEach((chunk) => {
          if (!chunk) return;
          if (/^\s+$/.test(chunk)) {
            frag.appendChild(document.createTextNode(chunk));
            return;
          }
          frag.appendChild(wrapWord(document.createTextNode(chunk)));
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        frag.appendChild(wrapWord(node.cloneNode(true)));
      }
    });

    el.textContent = "";
    el.appendChild(frag);
    el.dataset.split = "done";
  },
};
