export default (key) => {
  const refs = {
    addWatchedBtn: document.getElementById('add-watched'),
    addQueueBtn: document.getElementById('add-queue'),
    addListBtnGroup: document.getElementById('js-add-to-list'),
  }
  return key ? refs[key] : refs;
}