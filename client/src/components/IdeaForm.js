import IdeaList from './IdeaList';
import IdeasApi from '../services/IdeasApi';
const ideasApi = new IdeasApi();

class IdeaForm {
  constructor() {
    this._formModal = document.getElementById('form-modal');
    this._ideaList = new IdeaList();
  }

  addEventListeners() {
    this._form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();
    // Handle form submission logic here

    if (
      !this._form.elements['idea-text'].value ||
      !this._form.elements['tag'].value ||
      !this._form.elements['username'].value
    ) {
      alert('Please fill in all fields');
      return;
    }
    // Save to local storage
    localStorage.setItem('username', this._form.elements['username'].value);

    const idea = {
      text: this._form.elements['idea-text'].value,
      tag: this._form.elements['tag'].value,
      username: this._form.elements['username'].value,
    };
    // Add idea to server
    const newIdea = await ideasApi.createIdea(idea);

    // Add idea to List

    this._ideaList.addIdeaToList(newIdea.data.data);

    this._form.elements['idea-text'].value = '';
    this._form.elements['tag'].value = '';
    this._form.elements['username'].value = '';

    this.render();

    document.dispatchEvent(new Event('closeModal'));
  }

  render() {
    this._formModal.innerHTML = `
    <form id="idea-form">
          <div class="form-control">
            <label for="idea-text">Enter a Username</label>
            <input type="text" name="username" id="username" value="${localStorage.getItem('username') || ''}" />
          </div>
          <div class="form-control">
            <label for="idea-text">What's Your Idea?</label>
            <textarea name="text" id="idea-text"></textarea>
          </div>
          <div class="form-control">
            <label for="tag">Tag</label>
            <input type="text" name="tag" id="tag" />
          </div>
          <button class="btn" type="submit" id="submit">Submit</button>
        </form>`;

    this._form = document.getElementById('idea-form');
    this.addEventListeners();
  }
}

export default IdeaForm;
