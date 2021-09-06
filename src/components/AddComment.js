import { useState } from 'react';

const AddComment = ({ AddComment, postID, showComment }) => {
    const [comment, setComment] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if (!comment) {
            alert('Please add a comment')
            return
        }

        AddComment({ body: comment, postId: postID })
        showComment(postID)
        setComment('')
    }

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="Add Comment..."
                value={comment}
                onChange={e => setComment(e.target.value)} />
            <input
                type="submit"
                placeholder="Save Comment" />
        </form>
    )
}

export default AddComment;
