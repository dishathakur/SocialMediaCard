import Comment from './Comment'

const Comments = ({ comments }) => {
    return (
        <>
            {comments.map((comment, index) => {
                return (<Comment key={index} comment={comment} />)
            })}
        </>
    )
}

export default Comments
