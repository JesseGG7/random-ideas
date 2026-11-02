import IdeasApi from '../services/IdeasApi';
const ideasApi = new IdeasApi();
class IdeaList {
  constructor() {
    this._ideaListContainer = document.getElementById('idea-list');
    this._ideas = [];
    this.getIdeas();
    this._validTags = new Set();
    this._validTags.add('technology');
    this._validTags.add('software');
    this._validTags.add('business');
    this._validTags.add('education');
    this._validTags.add('health');
    this._validTags.add('inventions');
  }

  addEventListeners() {
    this._ideaListContainer.addEventListener(
      'click',
      this.handleDelete.bind(this),
    );
  }

  async getIdeas() {
    try {
      const response = await ideasApi.getIdeas();
      this._ideas = response.data.data;
      this.render();
    } catch (error) {
      console.error('Error fetching ideas:', error);
    }
  }

  addIdeaToList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  async handleDelete(e) {
    if (e.target.classList.contains('fa-times')) {
      e.stopImmediatePropagation();
      const ideaId =
        e.target.parentElement.parentElement.getAttribute('data-id');
      this.deleteIdea(ideaId);
    }
  }

  async deleteIdea(ideaId) {
    try {
      const response = await ideasApi.deleteIdea(ideaId);
      this._ideas = this._ideas.filter((idea) => idea._id !== ideaId);
      this.getIdeas();
    } catch (error) {
      console.error('Error deleting idea:', error);
      alert('Error deleting idea. Please try again.');
    }
  }

  getTagClass(tag) {
    const tagL = tag.toLowerCase();
    let tagClass = '';
    if (this._validTags.has(tagL)) {
      tagClass = `tag-${tagL}`;
    } else {
      tagClass = 'tag-technology';
    }
    return tagClass;
  }

  render() {
    this._ideaListContainer.innerHTML = this._ideas
      .map((idea) => {
        const tagClass = this.getTagClass(idea.tag);
        const button =
          idea.username === localStorage.getItem('username')
            ? `<button class="delete"><i class="fas fa-times"></i></button>`
            : '';
        return `
        <div class="card" data-id="${idea._id}">
          ${button}
          <h3>
            ${idea.text}
          </h3>
          <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
          <p>
            Posted on <span class="date">January 1, 2022</span> by
            <span class="author">${idea.username}</span>
          </p>
        </div>
      `;
      })
      .join('');

    this.addEventListeners();
  }
}

export default IdeaList;
