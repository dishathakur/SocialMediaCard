import Card from 'react-bootstrap/Card';
// image
import img from './../assets/images/americanProfile.jpg';
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faHeart, faSmile, faCommentAlt } from '@fortawesome/free-regular-svg-icons'
import AddComment from './AddComment';
import { useEffect, useState } from 'react';
import Comments from './Comments';

const PostCard = ({ postData, like, love, comment, commentData }) => {
    const [showAddComment, setShowAddComment] = useState(false)

    const [showComment, setShowComment] = useState([])


    // const fetchComments = (id) => {
    //     setShowAddComment(!showAddComment)
    //     const data = commentData(id)
    //     data.then(d =>
    //         setShowComment(d)
    //     )
    // }

    const toggleComments = (id) => {
        setShowAddComment(!showAddComment)
        fetchPostComments(id)
    }

    // fetch comments for a particular post
    const fetchPostComments = async (id) => {
        const res = await fetch(`http://localhost:5000/comments?postId=${id}`)
        const comment = await res.json()
        setShowComment(comment)
        console.log(showComment);
    }

    useEffect(() => {
        // const getComments = async() => {
        //     const commentsFromServer = await fetchPostComments()
        // }
    }, [showComment]);


    return (
        <Card style={{ width: '18rem' }} key={postData.id}>
            <Card.Img variant="top" src={img} />
            <Card.Body>
                <Card.Title>Description</Card.Title>
                <Card.Text>
                    {postData.post_description}
                </Card.Text>
                <span style={{ marginRight: '20px' }}>{postData.like}<FontAwesomeIcon icon={faThumbsUp} onClick={() => like(postData.id)} /></span>
                <span style={{ marginRight: '20px' }}>{postData.love}<FontAwesomeIcon icon={faHeart} onClick={() => love(postData.id)} /></span>
                <span style={{ marginRight: '20px' }}>{postData.laugh}<FontAwesomeIcon icon={faSmile} /></span>
                <span style={{ marginRight: '20px' }}><FontAwesomeIcon icon={faCommentAlt} onClick={() => toggleComments(postData.id)} /></span>
                {showAddComment &&
                    <>
                        <AddComment AddComment={comment} postID={postData.id} showComment={toggleComments} />
                        <Comments comments={showComment} />
                    </>
                }

            </Card.Body>

        </Card>
    )
}

export default PostCard;
