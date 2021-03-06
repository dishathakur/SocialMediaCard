import { useEffect, useState } from 'react';
// bootstrap
import Card from 'react-bootstrap/Card';
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faHeart, faCommentAlt, faLaughSquint } from '@fortawesome/free-regular-svg-icons'
// components
import Comments from './Comments';
import AddComment from './AddComment';
import User from './User';
import './PostCard.css';

const PostCard = ({ postData, like, love, comment, laugh }) => {
    const [showAddComment, setShowAddComment] = useState(false)
    const [showAllComments, setShowAllComments] = useState(false)
    const [showComment, setShowComment] = useState([])
    const [userDetails, setUserDetails] = useState([])

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

    // fetch users for a particular post
    const fetchPostUser = async (id) => {
        const res = await fetch(`http://localhost:5000/users?postId=${id}`)
        const user = await res.json()

        setUserDetails(user)
    }

    useEffect(() => {
        fetchPostComments(postData.id)
        fetchPostUser(postData.id)
    }, []);


    return (
        <Card style={{ width: '18rem', marginBottom: '20px', marginTop: '20px' }} key={postData.id}>
            <Card.Header>
                {userDetails.map(user => {
                    console.log('hey', user['name']);
                    return (
                        <User name={user['name']} />
                    )
                })}
            </Card.Header>
            <Card.Img variant="top" src={require('../assets/images/food.jpg').default} />
            <Card.Body>
                <Card.Title>Description</Card.Title>
                <Card.Text className="description">
                    {postData.post_description}
                </Card.Text>
                <span style={{ cursor: 'pointer', marginRight: '20px' }}>
                    {postData.like}<FontAwesomeIcon icon={faThumbsUp} onClick={() => like(postData.id)} />
                </span>
                <span style={{ cursor: 'pointer', marginRight: '20px' }}>
                    {postData.love}<FontAwesomeIcon icon={faHeart} onClick={() => love(postData.id)} />
                </span>
                <span style={{ cursor: 'pointer', marginRight: '20px' }}>
                    {postData.laugh}<FontAwesomeIcon icon={faLaughSquint} onClick={() => laugh(postData.id)} />
                </span>
                <span style={{ cursor: 'pointer', marginRight: '20px' }}>
                    <FontAwesomeIcon icon={faCommentAlt} onClick={() => toggleComments(postData.id)} />
                </span>
                {showAddComment &&
                    <>
                        <AddComment AddComment={comment} postID={postData.id} showComment={toggleComments} />
                        <Card style={{ marginTop: '20px' }}>
                            {showComment.length !== 0 &&
                                <Card.Header
                                    style={{ float: 'left' }}
                                    onClick={() => setShowAllComments(!showAllComments)}>
                                    {showAllComments
                                        ?
                                        <span style={{ cursor: 'pointer' }}>All Commments</span>
                                        : <span style={{ cursor: 'pointer' }}>Show Comments</span>
                                    }
                                    ({showComment.length}):
                                </Card.Header>}
                            {showAllComments &&
                                <div style={{ overflow: 'auto', height: '120px' }}>
                                    <Comments comments={showComment} />
                                </div>}
                        </Card>
                    </>
                }
            </Card.Body>
        </Card>
    )
}

export default PostCard;
