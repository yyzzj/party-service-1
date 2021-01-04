const formatBr = {
  bind(el, { value }) {
    const formatString = value.replace(/<br>/g, '\n')
    el.innerHTML = formatString
    el.style = 'white-space:pre-line;'
  }
}

export default formatBr
