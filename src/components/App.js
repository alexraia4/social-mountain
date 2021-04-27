import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';


class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      filter: ""
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );

    this.updateFilter = this.updateFilter.bind( this );
  }
  

  updateFilter(newFilter) {
    this.setState({filter: newFilter});
  }


  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then( derp => {
      this.setState({posts: derp.data});
    });
  }

  updatePost( id, text ) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${ id }`, { text }).then( results => {
      this.setState({ posts: results.data });
    });
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${ id }`).then( results => {
      this.setState({ posts: results.data });
    });
  }

  createPost( text ) {
    axios.post('https://practiceapi.devmountain.com/api/posts', { text }).then( results => {
      this.setState({ posts: results.data });
    });
  }

  render() {
    const { posts } = this.state;

    let newPosts = posts.filter(post => post.text.includes(this.state.filter));

    return (
      <div className="App__parent">
        <Header updateFilterFn = {this.updateFilter}/>

        <section className="App__content">

          <Compose createPostFn = {this.createPost}/>
          {
            newPosts.map( post => (
              <Post key={ post.id }
                    text={ post.text}
                    date={ post.date }
                    id={ post.id}
                    updatePostFn={ this.updatePost }
                    deletePostFn = { this.deletePost } />
            ))
          }
        </section>
      </div>
    );
  }
}

export default App;
