import './index.css'

import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {formatDistanceToNow} from 'date-fns'

import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentList: [],
    name: '',
    comment: '',
  }

  onNameChange = event => {
    this.setState({name: event.target.value})
  }

  onCommentChange = event => {
    this.setState({comment: event.target.value})
  }

  addNewComment = event => {
    event.preventDefault()

    const {comment, name} = this.state
    const newComment = {
      id: uuidv4(),
      date: formatDistanceToNow(new Date()),
      isLiked: false,
      name,
      comment,
      backgroundColor:
        initialContainerBackgroundClassNames[
          Math.ceil(
            Math.random() * initialContainerBackgroundClassNames.length - 1,
          )
        ],
    }

    this.setState(prevState => ({
      commentList: [...prevState.commentList, newComment],
      name: '',
      comment: '',
    }))
  }

  onLikeStatusChange = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(each => {
        if (each.id === id) {
          return {...each, isLiked: !each.isLiked}
        }
        return {each}
      }),
    }))
  }

  onCommentDelete = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.filter(each => each.id !== id),
    }))
  }

  render() {
    const {commentList, comment, name} = this.state

    return (
      <div className="background-con">
        <h1>Comments</h1>
        <div className="form-con">
          <div>
            <p>Say something about 4.0 Technologies</p>
            <form>
              <input
                placeholder="Your Name"
                type="text"
                value={name}
                onChange={this.onNameChange}
              />
              <br />
              <textarea
                placeholder="Your Comment"
                onChange={this.onCommentChange}
                value={comment}
                rows="10"
                cols="50"
              />
              <br />
              <button
                data-testid="button"
                onClick={this.addNewComment}
                className="button"
              >
                Add Comments
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
          />
        </div>
        <hr />
        <div className="count-con">
          <p className="count">{commentList.length}</p>
          <p>Comments</p>
        </div>
        <ul>
          {commentList.map(eachComment => (
            <CommentItem
              onCommentDelete={this.onCommentDelete}
              eachComment={eachComment}
              onLikeStatusChange={this.onLikeStatusChange}
              key={eachComment.id}
            />
          ))}
        </ul>
      </div>
    )
  }
}
export default Comments
