import { useState, useEffect } from 'react';
// bootstrap
import { Col, Container, Row } from 'react-bootstrap';
//components
import PostCard from './PostCard';

const SocialMediaCard = () => {
    const [data, setData] = useState([]);
    const [commenttext, setCommenttext] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const postsFromServer = await fetchPosts()
            setData(postsFromServer)
        }

        const getComments = async () => {
            const commentsFromServer = await fetchComments()
            setCommenttext(commentsFromServer)
        }

        getPosts()
        getComments()
    }, [])

    // fetch posts from server
    const fetchPosts = async () => {
        const res = await fetch('http://localhost:5000/posts')
        const post = await res.json()

        return post;
    }

    // fetch single post from server
    const fetchPost = async (id) => {
        const res = await fetch(`http://localhost:5000/posts/${id}`)
        const post = await res.json()

        return post;
    }

    // fetch comments from server
    const fetchComments = async () => {
        const res = await fetch('http://localhost:5000/comments')
        const comment = await res.json()

        return comment;
    }

    // fetch comments for a particular post
    const fetchPostComments = async (id) => {
        const res = await fetch(`http://localhost:5000/comments?postId=${id}`)
        const comment = await res.json()

        return comment;
    }

    // like post functionality
    const likeHandler = async (id) => {
        const postToLike = await fetchPost(id)
        const likePost = { ...postToLike, like: postToLike.like + 1 }

        const res = await fetch(`http://localhost:5000/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(likePost)
        })

        const postDB = await res.json()

        setData(
            data.map((post) => {
                return (
                    post.id === id ? { ...post, like: (postDB.like) } : post
                );
            })
        );
    }

    // love post functionality
    const loveHandler = async (id) => {
        const postToLove = await fetchPost(id)
        const lovePost = { ...postToLove, love: postToLove.love + 1 }

        const res = await fetch(`http://localhost:5000/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(lovePost)
        })

        const postDB = await res.json()

        setData(
            data.map((post) => {
                return (
                    post.id === id ? { ...post, love: postDB.love } : post
                );
            })
        );
    }

    // laugh post functionality
    const laughHandler = async (id) => {
        const postToLaugh = await fetchPost(id)
        const laughPost = { ...postToLaugh, laugh: postToLaugh.laugh + 1 }

        const res = await fetch(`http://localhost:5000/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(laughPost)
        })

        const postDB = await res.json()

        setData(
            data.map((post) => {
                return (
                    post.id === id ? { ...post, laugh: postDB.laugh } : post
                );
            })
        );
    }

    // Add comment to post
    const AddComment = async (text) => {
        const res = await fetch('http://localhost:5000/comments', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(text)
        })

        const data = await res.json()

        setCommenttext([...commenttext, data])
    }

    return (
        <>
            <Container>
                <Row >
                    {
                        data.map((post, index) => {
                            return (
                                <Col>
                                    <PostCard
                                        key={index}
                                        postData={post}
                                        like={likeHandler}
                                        love={loveHandler}
                                        laugh={laughHandler}
                                        comment={AddComment}
                                    />
                                </Col>
                            )
                        })

                    }
                </Row>
            </Container>


        </>
    );
}

export default SocialMediaCard;
