import './index.css'

const CommentItem = props => {
  const {eachComment, onCommentDelete, onLikeStatusChange} = props

  const {name, date, comment, isLiked, id, backgroundColor} = eachComment

  const onToggle = () => {
    onLikeStatusChange(id)
  }

  const ondelete = () => {
    onCommentDelete(id)
  }

  const likedClass = isLiked ? 'liked' : 'notLiked'

  const imgurl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  return (
    <li>
      <div className="comment-detils">
        <p className={`${backgroundColor} letter`}>{name[0]}</p>
        <div className="name-time">
          <p className="name">{name}</p>
          <p className="date">{date}</p>
        </div>
      </div>
      <p className="comment">{comment}</p>
      <div className="buttons-con">
        <div className="like-icon-con">
          <img src={imgurl} alt="like" />
          <button type="button" className={likedClass} onClick={onToggle}>
            Like
          </button>
        </div>
        <button data-testid="delete" type="button" onClick={ondelete}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
