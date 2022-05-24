export const plusMinus = (e) => {
    if (getComputedStyle(e.target).getPropertyValue('--minus') === 'none') {
      e.target.style.setProperty('--minus', 'block')
    } else {
      e.target.style.setProperty('--minus', 'none')
    }
}