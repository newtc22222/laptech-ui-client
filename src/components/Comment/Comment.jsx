/** @format */

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { postComments } from '../../redux/comment/commentsApi';
import { Avatar, Box, Collapse, Grid, InputBase, Paper, makeStyles } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import 'react-toastify/dist/ReactToastify.css';
import { commentService } from '../../services';
import { convertUTCDate } from '../../utils/ConvertUTCDate';
import convertToIcon from '../../utils/convertToIcon';

const useStyles = makeStyles(() => ({
  inputBase: {
    backgroundColor: 'rgb(255, 255, 255)',
    border: '1.3px ridge rgb(231, 231, 231)',
    padding: '9px',
    width: '100%',
    borderRadius: '10px',
    fontSize: '16px',
  },
  emojiWrapper: {
    display: 'inline-block',
    width: '24px',
    maxHeight: '24px',
    verticalAlign: 'middle',
  },
}));

const Comment = () => {
  const dataUser = JSON.parse(localStorage.getItem('loginClient')) || {};
  const { user } = dataUser || {};
  const [content, setContent] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [index, setIndex] = useState();
  const [commentList, setCommentList] = useState([]);

  const dispatch = useDispatch();
  const { id } = useParams();

  const classes = useStyles();

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    commentService.getCommentByProductId(id).then((res) => {
      setCommentList(res.data);
    });
  };

  const handleChangeCommentInput = (e) => {
    setContent(e.target.value);
  };

  const handleChangeReplyContent = (e) => {
    setReplyContent(e.target.value);
  };

  const handleClick = (id) => {
    if (index === id) {
      setIndex(null);
    } else {
      setIndex(id);
    }
  };

  const dataPostComment = {
    id: crypto.randomUUID().slice(0, 5),
    phone: user?.phone,
    username: user?.name,
    productId: id,
    content: content,
    updateBy: 'system',
  };

  const dataPostReplyComment = {
    rootCommentId: index,
    id: crypto.randomUUID().slice(0, 5),
    phone: user?.phone,
    username: user?.name,
    productId: id,
    content: replyContent,
    updateBy: 'system',
  };

  const [likedCommentId, setLikedCommentId] = useState(null);

  const handleClickLike = (commentId) => {
    if (likedCommentId === commentId) {
      setLikedCommentId(null); // Toggle off if already liked
    } else {
      setLikedCommentId(commentId); // Toggle on if not liked
    }
  };

  const hanldePostComment = () => {
    if (Object.keys(dataUser).length === 0 && dataUser.constructor === Object) {
      alert('Đăng nhập vào hệ thống để bình luận về sản phẩm');
    } else {
      postComments(dispatch, dataPostComment)
        .then(() => {
          setContent('');
          fetchComments();
        })
        .catch((error) => {
          console.log('Error posting comment:', error);
        });
    }
  };

  const hanldePostReplyComment = () => {
    if (Object.keys(dataUser).length === 0 && dataUser.constructor === Object) {
      alert('Đăng nhập vào hệ thống để trả lời bình luận');
    } else {
      postComments(dispatch, dataPostReplyComment)
        .then(() => {
          setReplyContent('');
          fetchComments();
        })
        .catch((error) => {
          console.log('Error posting reply comment:', error);
        });
    }
  };

  return (
    <Box style={{ paddingBottom: '20px' }}>
      <h2 className="my-4">Thảo luận </h2>
      {commentList?.map((comment) => {
        if (comment.rootCommentId === null) {
          var replyCount = commentList.filter(
            (reply) => reply.rootCommentId !== null && reply.rootCommentId === comment.id,
          ).length;

          return (
            <Box style={{ padding: '10px 20px' }}>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <Avatar alt="Remy Sharp" src="" />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <h4 style={{ margin: 0, textAlign: 'left' }}>{comment.username}</h4>
                  <p style={{ textAlign: 'left' }}>
                    <p style={{ textAlign: 'left' }}>{convertToIcon(comment.content)}</p>
                  </p>
                  <p style={{ textAlign: 'left', color: 'gray' }}>{convertUTCDate(comment.createdDate)}</p>
                  <div className="flex">
                    <span
                      className={`mr-4 cursor-pointer flex items-center}`}
                      onClick={() => handleClickLike(comment.id)}
                    >
                      {likedCommentId === comment.id ? (
                        <ThumbUpOffAltIcon style={{ color: 'blue' }} />
                      ) : (
                        <ThumbUpOffAltIcon />
                      )}
                      Thích
                    </span>
                    <span onClick={() => handleClick(comment.id)} className="cursor-pointer">
                      Trả lời {replyCount > 0 && ` (${replyCount})`}
                    </span>
                  </div>
                  {commentList?.map((reply) => {
                    if (reply.rootCommentId !== null && reply.rootCommentId === comment.id) {
                      return (
                        <div className="ml-[60px] py-2">
                          <Collapse in={comment.id === index} timeout="auto" unmountOnExit>
                            <Grid container wrap="nowrap" spacing={2}>
                              <Grid item>
                                <Avatar alt="Remy Sharp" src="" />
                              </Grid>
                              <Grid justifyContent="left" item xs zeroMinWidth>
                                <h4 style={{ margin: 0, textAlign: 'left' }}>{reply.username}</h4>
                                <p style={{ textAlign: 'left' }}>{reply.content}</p>
                                <p style={{ textAlign: 'left', color: 'gray' }}>{convertUTCDate(reply.createdDate)}</p>
                              </Grid>
                            </Grid>
                          </Collapse>
                        </div>
                      );
                    }
                    return null;
                  })}
                  <div className="ml-[60px] py-4">
                    <Collapse in={comment.id === index} timeout="auto" unmountOnExit>
                      <Grid className="ml-[40px]" container wrap="nowrap" spacing={2}>
                        <InputBase
                          placeholder="Trả lời"
                          value={replyContent}
                          className={classes.inputBase}
                          onChange={handleChangeReplyContent}
                          endAdornment={
                            <SendIcon
                              onClick={hanldePostReplyComment}
                              style={{ fontSize: '32px', cursor: 'pointer' }}
                            />
                          }
                        />
                      </Grid>
                    </Collapse>
                  </div>
                </Grid>
              </Grid>
            </Box>
          );
        }
        return null;
      })}

      <Paper style={{ padding: '20px' }}>
        <Grid container wrap="nowrap" spacing={2}>
          <InputBase
            placeholder="Bình luận"
            value={content}
            className={classes.inputBase}
            onChange={handleChangeCommentInput}
            endAdornment={
              <SendIcon onClick={() => hanldePostComment()} style={{ fontSize: '32px', cursor: 'pointer' }} />
            }
          />
        </Grid>
      </Paper>
    </Box>
  );
};

export default Comment;
