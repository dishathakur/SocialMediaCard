import Comment from './Comment'

const Comments = ({ comments }) => {
    return (
        <>
            {comments.map((comment, index) => {
                return (
                    <div style={{ display: 'flex', padding: '4px', border: '2px solid lightGrey', margin: '8px' }}>
                        <span>By Matt: &nbsp; </span>
                        <Comment key={index} comment={comment} />
                    </div>
                )
            })}
        </>
    )
}

export default Comments
