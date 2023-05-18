export function updateTextAreaSize(textarea?: HTMLTextAreaElement) {
    if(textarea == null) return
    textarea.style.height = "0"
    textarea.style.height = `${textarea.scrollHeight}px`
  }
  