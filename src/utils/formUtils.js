
/**
 * Reset input fields from a form & errors 
 * 
 * @param {*} reset 
 * @param {*} setError 
 * @param {*} setOK 
 */
export const resetForm = (reset, setError) => {
  reset()
  setError('')
}