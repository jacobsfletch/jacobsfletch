export default function(e) {
    let element = e.target ? e.target : e
    const ruler = element.parentNode.lastChild
    ruler.innerHTML = element.value ? element.value : element.placeholder
    const rulerWidth = ruler.offsetWidth
    element.style.width = rulerWidth + 8 + 'px'
}
