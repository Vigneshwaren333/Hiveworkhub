import React, { useEffect, useState } from "react";
import { Client } from "@hiveio/dhive";
import { marked } from "marked";
import { FiSearch, FiTag, FiTrendingUp, FiThumbsUp, FiMessageCircle, FiLogOut, FiEdit, FiCompass } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import HiveFreelance from './components/HiveFreelance';

const client = new Client(["https://api.hive.blog"]);

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #0A0914 0%, #13111C 100%)',
    padding: '0',
  },
  wrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  headerSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.25rem 2rem',
    backgroundColor: 'rgba(19, 17, 28, 0.95)',
    borderBottom: '1px solid rgba(93, 47, 189, 0.2)',
    backdropFilter: 'blur(10px)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    color: '#fff',
    fontSize: '1.5rem',
    fontWeight: '700',
    textDecoration: 'none',
    background: 'linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.9) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    '& svg': {
      color: '#5d2fbd',
    },
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  username: {
    color: 'rgba(255, 255, 255, 0.9)',
    padding: '0.5rem 1rem',
    borderRadius: '0.75rem',
    backgroundColor: 'rgba(93, 47, 189, 0.15)',
    border: '1px solid rgba(93, 47, 189, 0.3)',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'all 0.3s',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      transform: 'translateY(-1px)',
    },
  },
  welcomeSection: {
    padding: '4rem 2rem',
    background: 'linear-gradient(165deg, rgba(93, 47, 189, 0.08) 0%, rgba(93, 47, 189, 0.03) 100%)',
    marginBottom: '3rem',
    borderBottom: '1px solid rgba(93, 47, 189, 0.15)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(93, 47, 189, 0.3), transparent)',
    },
  },
  welcomeText: {
    fontSize: '2.5rem',
    background: 'linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.8) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '1rem',
    fontWeight: '700',
    textAlign: 'left',
    maxWidth: '800px',
    margin: '0 auto',
  },
  subtitle: {
    fontSize: '1.125rem',
    color: 'rgba(255, 255, 255, 0.7)',
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: '1.6',
    textAlign: 'left',
  },
  navigationTabs: {
    display: 'flex',
    gap: '1rem',
    padding: '0 2rem',
    maxWidth: '800px',
    margin: '0 auto 3rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem 1.5rem',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s',
    borderBottom: '2px solid transparent',
    backgroundColor: 'transparent',
    border: 'none',
    '&:hover': {
      color: 'white',
    },
  },
  activeTab: {
    color: 'white',
    borderBottom: '2px solid #5d2fbd',
    backgroundColor: 'rgba(93, 47, 189, 0.1)',
  },
  mainContent: {
    padding: '0 2rem',
  },
  controls: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1.5rem',
    marginBottom: '2.5rem',
    maxWidth: '800px',
    margin: '0 auto 2.5rem',
    padding: '2rem',
    backgroundColor: '#1E1E2D',
    borderRadius: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    boxSizing: 'border-box',
    '@media (min-width: 768px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
  inputGroup: {
    position: 'relative',
    transition: 'all 0.3s',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '1rem',
    padding: '0.5rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxSizing: 'border-box',
    width: '100%',
    '&:hover': {
      transform: 'translateY(-2px)',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(93, 47, 189, 0.3)',
      boxShadow: '0 4px 12px rgba(93, 47, 189, 0.1)',
    },
  },
  icon: {
    position: 'absolute',
    left: '1.5rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#5d2fbd',
    fontSize: '1.25rem',
    opacity: '0.8',
    transition: 'all 0.3s',
  },
  input: {
    width: '100%',
    padding: '1rem 1rem 1rem 3.5rem',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    color: 'white',
    transition: 'all 0.3s',
    outline: 'none',
    boxSizing: 'border-box',
    '&:focus': {
      borderColor: '#5d2fbd',
      backgroundColor: 'rgba(93, 47, 189, 0.1)',
      boxShadow: '0 0 0 3px rgba(93, 47, 189, 0.15)',
    },
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.4)',
      fontSize: '0.875rem',
    },
  },
  select: {
    width: '100%',
    padding: '1rem 1rem 1rem 1.5rem',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    color: 'white',
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.3s',
    appearance: 'none',
    boxSizing: 'border-box',
    backgroundImage: 'linear-gradient(45deg, transparent 50%, #5d2fbd 50%), linear-gradient(135deg, #5d2fbd 50%, transparent 50%)',
    backgroundPosition: 'calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px)',
    backgroundSize: '5px 5px, 5px 5px',
    backgroundRepeat: 'no-repeat',
    '&:focus': {
      borderColor: '#5d2fbd',
      backgroundColor: 'rgba(93, 47, 189, 0.1)',
      boxShadow: '0 0 0 3px rgba(93, 47, 189, 0.15)',
    },
    '&:hover': {
      backgroundColor: 'rgba(93, 47, 189, 0.1)',
      borderColor: '#5d2fbd',
    },
    '& option': {
      backgroundColor: '#1E1E2D',
      color: 'white',
      fontSize: '0.875rem',
      padding: '0.5rem',
    },
  },
  postGrid: {
    display: 'grid',
    gap: '1.5rem',
    gridTemplateColumns: '1fr',
    '@media (min-width: 768px)': {
      gridTemplateColumns: 'repeat(1, 1fr)',
      maxWidth: '800px',
      margin: '0 auto',
    },
  },
  postCard: {
    background: 'linear-gradient(165deg, rgba(30, 30, 45, 0.8), rgba(19, 17, 28, 0.9))',
    borderRadius: '1.25rem',
    padding: '2rem',
    position: 'relative',
    transition: 'all 0.3s',
    border: '2px solid rgba(93, 47, 189, 0.3)',
    boxShadow: '0 4px 20px rgba(93, 47, 189, 0.15)',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(165deg, rgba(93, 47, 189, 0.1), transparent)',
      pointerEvents: 'none',
    },
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 32px rgba(93, 47, 189, 0.2)',
      border: '2px solid rgba(93, 47, 189, 0.4)',
      background: 'linear-gradient(165deg, rgba(35, 35, 50, 0.8), rgba(25, 22, 33, 0.9))',
    },
  },
  postTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: 'white',
    marginBottom: '1rem',
    textDecoration: 'none',
    display: 'block',
    lineHeight: '1.4',
    transition: 'all 0.3s',
    background: 'linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.8) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    '&:hover': {
      background: 'linear-gradient(135deg, #5d2fbd 0%, #7b4ddb 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      transform: 'translateX(4px)',
    },
  },
  postMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '0.75rem',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '0.75rem',
  },
  author: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '0.875rem',
  },
  avatar: {
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid rgba(93, 47, 189, 0.4)',
    padding: '2px',
    background: 'linear-gradient(45deg, #5d2fbd, rgba(93, 47, 189, 0.4))',
    boxShadow: '0 4px 12px rgba(93, 47, 189, 0.25)',
  },
  content: {
    color: '#ffffff',
    lineHeight: '1.6',
    fontSize: '0.875rem',
    marginBottom: '1rem',
    padding: '1rem 1.25rem',
    background: 'linear-gradient(145deg, rgba(40, 40, 55, 0.4), rgba(25, 22, 33, 0.5))',
    borderRadius: '0.75rem',
    border: '1px solid rgba(93, 47, 189, 0.2)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  stats: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '1.5rem',
    marginTop: '1rem',
    padding: '0.75rem 1.25rem',
    background: 'linear-gradient(145deg, rgba(30, 30, 45, 0.6), rgba(19, 17, 28, 0.7))',
    borderRadius: '0.75rem',
    border: '1px solid rgba(93, 47, 189, 0.2)',
    boxShadow: '0 2px 8px rgba(93, 47, 189, 0.1)',
  },
  stat: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#fff',
    fontSize: '0.875rem',
    '& svg': {
      color: 'rgba(255, 255, 255, 0.7)',
    },
  },
  payoutInfo: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.4rem 0.75rem',
    color: '#4CAF50',
    fontSize: '0.875rem',
    fontWeight: '500',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderRadius: '0.5rem',
    border: '1px solid rgba(76, 175, 80, 0.2)',
  },
  upvoteButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#5d2fbd',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '0.75rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    marginRight: '0.75rem',
    '&:hover': {
      backgroundColor: '#4d27a8',
      transform: 'translateY(-2px)',
    },
  },
  comments: {
    marginTop: '2rem',
    padding: '1.5rem',
    background: 'linear-gradient(165deg, rgba(30, 30, 45, 0.8), rgba(19, 17, 28, 0.9))',
    borderRadius: '1.25rem',
    border: '2px solid rgba(93, 47, 189, 0.3)',
    boxShadow: '0 4px 20px rgba(93, 47, 189, 0.15)',
    position: 'relative',
    overflow: 'hidden',
  },
  commentTitle: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#fff',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1.25rem',
    background: 'linear-gradient(145deg, rgba(93, 47, 189, 0.3), rgba(93, 47, 189, 0.1))',
    borderRadius: '0.75rem',
    letterSpacing: '0.5px',
    border: '1px solid rgba(93, 47, 189, 0.3)',
    boxShadow: '0 2px 8px rgba(93, 47, 189, 0.15)',
    '& svg': {
      color: '#fff',
      fontSize: '1.25rem'
    }
  },
  commentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  comment: {
    background: 'linear-gradient(145deg, rgba(30, 30, 45, 0.7), rgba(19, 17, 28, 0.8))',
    borderRadius: '1rem',
    padding: '1.25rem',
    border: '2px solid rgba(93, 47, 189, 0.25)',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: '1rem',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 24px rgba(93, 47, 189, 0.2)',
      border: '2px solid rgba(93, 47, 189, 0.4)',
      background: 'linear-gradient(145deg, rgba(35, 35, 50, 0.7), rgba(25, 22, 33, 0.8))',
    },
    '& .author': {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1rem',
      '& img': {
        width: '2.5rem',
        height: '2.5rem',
        borderRadius: '50%',
        border: '2px solid rgba(93, 47, 189, 0.4)',
        padding: '2px',
        background: 'linear-gradient(45deg, #5d2fbd, rgba(93, 47, 189, 0.4))',
        objectFit: 'cover',
        boxShadow: '0 4px 12px rgba(93, 47, 189, 0.25)',
      },
      '& span': {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: '0.875rem',
        letterSpacing: '0.3px',
      },
    },
    '& .content': {
      color: '#ffffff',
      fontSize: '0.875rem',
      lineHeight: '1.6',
      padding: '1rem 1.25rem',
      background: 'linear-gradient(145deg, rgba(40, 40, 55, 0.4), rgba(25, 22, 33, 0.5))',
      borderRadius: '0.75rem',
      marginLeft: '3.5rem',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
      border: '1px solid rgba(93, 47, 189, 0.2)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
  },
  error: {
    padding: '1.25rem',
    backgroundColor: 'rgba(255, 87, 87, 0.1)',
    color: '#ff5757',
    borderRadius: '0.75rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
    border: '1px solid rgba(255, 87, 87, 0.2)',
    fontWeight: '500',
  },
  empty: {
    textAlign: 'center',
    padding: '4rem 0',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '1.25rem',
  },
  sendTokensButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '0.75rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#45A049',
    },
  },
  createPostForm: {
    backgroundColor: '#1E1E2D',
    borderRadius: '1.5rem',
    padding: '2.5rem',
    maxWidth: '800px',
    margin: '0 auto',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    boxSizing: 'border-box',
  },
  formHeader: {
    marginBottom: '2.5rem',
    textAlign: 'center',
    position: 'relative',
    padding: '1.5rem',
    backgroundColor: 'rgba(93, 47, 189, 0.1)',
    borderRadius: '1rem',
    border: '1px solid rgba(93, 47, 189, 0.2)',
    width: '100%',
    boxSizing: 'border-box',
    margin: '0 0 2.5rem 0',
  },
  formTitle: {
    fontSize: '2rem',
    color: '#fff',
    fontWeight: '700',
    marginBottom: '0.75rem',
    letterSpacing: '0.5px',
    textAlign: 'center',
  },
  formSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.875rem',
    lineHeight: '1.5',
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto',
  },
  formGroup: {
    marginBottom: '1.5rem',
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: '1.5rem',
    borderRadius: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    width: '100%',
    boxSizing: 'border-box',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '1rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  textInput: {
    width: '100%',
    padding: '0.875rem 1.25rem',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    color: 'white',
    transition: 'all 0.2s',
    outline: 'none',
    boxSizing: 'border-box',
    '&:focus': {
      borderColor: '#5d2fbd',
      backgroundColor: 'rgba(93, 47, 189, 0.1)',
      boxShadow: '0 0 0 3px rgba(93, 47, 189, 0.15)',
    },
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.3)',
    },
  },
  textarea: {
    width: '100%',
    padding: '1rem 1.25rem',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    color: 'white',
    transition: 'all 0.2s',
    outline: 'none',
    minHeight: '250px',
    resize: 'vertical',
    lineHeight: '1.6',
    boxSizing: 'border-box',
    '&:focus': {
      borderColor: '#5d2fbd',
      backgroundColor: 'rgba(93, 47, 189, 0.1)',
      boxShadow: '0 0 0 3px rgba(93, 47, 189, 0.15)',
    },
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.3)',
    },
  },
  previewSection: {
    marginTop: '1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  previewTitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '0.875rem',
    fontWeight: '600',
    padding: '1rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  submitButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    padding: '1rem 2rem',
    backgroundColor: '#5d2fbd',
    color: 'white',
    border: 'none',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    width: '100%',
    maxWidth: '200px',
    margin: '2rem auto 0',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    '&:hover': {
      backgroundColor: '#4d27a8',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(93, 47, 189, 0.3)',
    },
    '&:disabled': {
      opacity: 0.7,
      cursor: 'not-allowed',
      transform: 'none',
    },
  },
  tabButton: {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '0.5rem',
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s',
    '&:hover': {
      backgroundColor: 'rgba(93, 47, 189, 0.1)',
    },
  },
  authorInfo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
    color: '#ffffff',
    padding: '0.75rem 1.25rem',
    background: 'linear-gradient(145deg, rgba(93, 47, 189, 0.2), rgba(93, 47, 189, 0.1))',
    borderRadius: '0.75rem',
    border: '1px solid rgba(93, 47, 189, 0.2)',
    boxShadow: '0 2px 8px rgba(93, 47, 189, 0.15)',
  },
  reputationBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.25rem 0.75rem',
    background: 'linear-gradient(145deg, rgba(93, 47, 189, 0.2), rgba(93, 47, 189, 0.1))',
    border: '1px solid rgba(93, 47, 189, 0.25)',
    borderRadius: '1rem',
    fontSize: '0.75rem',
    color: '#fff',
    marginLeft: '0.5rem',
    fontWeight: '500',
    boxShadow: '0 2px 8px rgba(93, 47, 189, 0.1)',
  },
};

const HiveBlogs = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [error, setError] = useState(null);
  const [tag, setTag] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("trending");
  const [username, setUsername] = useState('');
  const [activeTab, setActiveTab] = useState('explore');
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [postTags, setPostTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reputations, setReputations] = useState({});
  const [reputationLoading, setReputationLoading] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchTag, setSearchTag] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem('hive_username');
    if (!storedUsername) {
      navigate('/');
      return;
    }
    setUsername(storedUsername);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('hive_username');
    navigate('/');
  };

  const fetchReputation = async (username) => {
    if (!username || reputationLoading[username]) return;
    
    setReputationLoading(prev => ({ ...prev, [username]: true }));
    
    try {
      const response = await fetch(
        "https://api.hive.blog",
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "condenser_api.get_accounts",
            params: [[username]],
            id: 1
          }),
        }
      );

      const data = await response.json();
      
      if (data.result && data.result.length > 0) {
        const reputation = data.result[0].reputation;
        const convertReputation = (raw) => {
          if (raw == null || raw === 0) return 25;
          const neg = raw < 0;
          const repLog = Math.log10(Math.abs(raw));
          const rep = Math.max(repLog - 9, 0);
          if (rep < 0) return 25;
          return ((neg ? -1 : 1) * rep * 9 + 25).toFixed(1);
        };

        const readableRep = convertReputation(reputation);
        setReputations(prev => ({
          ...prev,
          [username]: readableRep
        }));
      }
    } catch (error) {
      console.error("Error fetching reputation for", username, ":", error);
    } finally {
      setReputationLoading(prev => ({ ...prev, [username]: false }));
    }
  };

  const fetchComments = async (author, permlink) => {
    try {
      const comments = await client.database.call('get_content_replies', [author, permlink]);
      setComments(prev => ({
        ...prev,
        [permlink]: comments
      }));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      const query = {
        tag: searchTag || tag || "hive-148441",
        limit: 20,
      };
      const result = await client.database.getDiscussions("created", query);
      setPosts(result);
      
      // Fetch reputation and comments for each post
      result.forEach(post => {
        fetchReputation(post.author);
        fetchComments(post.author, post.permlink);
      });
      
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      setError("Failed to fetch blog posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, [tag, search, sort]);

  const handleUpvote = (author, permlink) => {
    if (typeof window.hive_keychain === 'undefined') {
      alert('Please install Hive Keychain extension first!');
      return;
    }

    const weight = 10000; // 100% upvote
    const callback = function(response) {
      if (response.success) {
        alert('Upvote successful!');
        fetchBlogPosts();
      } else {
        alert('Upvote failed: ' + response.message);
      }
    };

    try {
      window.hive_keychain.requestVote(
        username,
        permlink,
        author,
        weight,
        function(response) {
          if (response.success) {
            alert('Upvote successful!');
            fetchBlogPosts();
          } else {
            alert('Upvote failed: ' + response.message);
          }
        }
      );
    } catch (err) {
      alert('Error while voting: ' + err.message);
    }
  };

  const handleSendTokens = (author) => {
    if (!window.hive_keychain) {
      alert('Hive Keychain is not installed.');
      return;
    }

    const amount = prompt('Enter the amount of HIVE to send (e.g., 1.000):');
    if (!amount || isNaN(parseFloat(amount))) {
      alert('Please enter a valid number');
      return;
    }

    // Format amount to exactly 3 decimal places
    const formattedAmount = Number(parseFloat(amount)).toFixed(3);

    window.hive_keychain.requestTransfer(
      username,
      author,
      formattedAmount,
      'Sending tokens via HiveWork Hub',
      'HIVE',
      (response) => {
        if (response.success) {
          alert('Tokens sent successfully!');
        } else {
          alert('Token transfer failed: ' + response.message);
        }
      }
    );
  };

  const processContent = (content) => {
    return marked(content.substring(0, 300))
      .replace(/<img[^>]*>/g, '')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/https?:\/\/\S+?(?:jpg|jpeg|gif|png|webp)/gi, '')
      + '...';
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!window.hive_keychain) {
      alert('Hive Keychain is not installed.');
      return;
    }

    if (!postTitle.trim() || !postBody.trim() || !postTags.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const permlink = postTitle
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-');

      const tags = postTags.toLowerCase().split(' ').filter(tag => tag);
      const operations = [
        ['comment',
          {
            parent_author: '',
            parent_permlink: tags[0],
            author: username,
            permlink: permlink,
            title: postTitle,
            body: postBody,
            json_metadata: JSON.stringify({
              tags: tags,
              app: 'hive-blog-explorer'
            })
          }
        ]
      ];

      window.hive_keychain.requestBroadcast(
        username,
        operations,
        'posting',
        (response) => {
          if (response.success) {
            alert('Post created successfully!');
            setPostTitle('');
            setPostBody('');
            setPostTags('');
            setActiveTab('explore');
            fetchBlogPosts();
          } else {
            alert('Failed to create post: ' + response.message);
          }
          setIsSubmitting(false);
        }
      );
    } catch (err) {
      alert('Error creating post: ' + err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerSection}>
        <div style={styles.logo}>
          <FiTrendingUp size={24} />
          HiveWork Hub
        </div>
        <div style={styles.userSection}>
          <span style={styles.username}>@{username}</span>
          <button onClick={handleLogout} style={styles.logoutButton}>
            <FiLogOut /> Logout
          </button>
        </div>
      </div>

      <div style={styles.wrapper}>
        <div style={styles.welcomeSection}>
          <h2 style={styles.welcomeText}>Welcome to HiveWork Hub, @{username}! 👋</h2>
          <p style={styles.subtitle}>
            Your gateway to blockchain opportunities - Connect, Create, and Collaborate on the Hive network
          </p>
        </div>

        <div style={styles.navigationTabs}>
          <button
            style={{
              ...styles.tabButton,
              backgroundColor: activeTab === 'explore' ? 'rgba(93, 47, 189, 0.2)' : 'transparent',
            }}
            onClick={() => setActiveTab('explore')}
          >
            <FiCompass /> Explore Posts
          </button>
          <button
            style={{
              ...styles.tabButton,
              backgroundColor: activeTab === 'create' ? 'rgba(93, 47, 189, 0.2)' : 'transparent',
            }}
            onClick={() => setActiveTab('create')}
          >
            <FiEdit /> Create Post
          </button>
          <button
            style={{
              ...styles.tabButton,
              backgroundColor: activeTab === 'freelance' ? 'rgba(93, 47, 189, 0.2)' : 'transparent',
            }}
            onClick={() => setActiveTab('freelance')}
          >
            <FiTrendingUp /> Freelance Marketplace
          </button>
        </div>

        <div style={styles.mainContent}>
          {activeTab === 'explore' ? (
            <>
              {error && <div style={styles.error}>{error}</div>}
              <div style={styles.controls}>
                <div style={styles.inputGroup}>
                  <FiSearch style={styles.icon} />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={styles.input}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <FiTag style={styles.icon} />
                  <input
                    type="text"
                    placeholder="Filter by tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    style={styles.input}
                  />
                </div>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  style={styles.select}
                >
                  <option value="trending">🔥 Trending</option>
                  <option value="hot">⚡ Hot</option>
                  <option value="created">✨ Newest</option>
                  <option value="promoted">🚀 Promoted</option>
                </select>
              </div>

              {posts.length > 0 ? (
                <div style={styles.postGrid}>
                  {posts.map((post, index) => (
                    <article key={index} style={styles.postCard}>
                      <div style={styles.authorInfo}>
                        <span>Posted by: {post.author}</span>
                        {reputationLoading[post.author] ? (
                          <span style={styles.reputationBadge}>Loading...</span>
                        ) : (
                          <span style={styles.reputationBadge}>
                            Rep: {reputations[post.author] || '25.0'}
                          </span>
                        )}
                      </div>
                      <a
                        href={`https://hive.blog/@${post.author}/${post.permlink}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.postTitle}
                      >
                        {post.title}
                      </a>

                      <div style={styles.postMeta}>
                        <div style={styles.author}>
                          <img
                            src={`https://images.hive.blog/u/${post.author}/avatar/small`}
                            alt={post.author}
                            style={styles.avatar}
                          />
                          <span>@{post.author}</span>
                        </div>
                        <span>{new Date(post.created).toLocaleDateString()}</span>
                      </div>

                      <div
                        style={styles.content}
                        dangerouslySetInnerHTML={{
                          __html: processContent(post.body),
                        }}
                      />

                      <div style={styles.stats}>
                        <div style={styles.stat}>
                          <FiThumbsUp size={16} />
                          Votes {post.net_votes}
                        </div>
                        <div style={styles.stat}>
                          <FiMessageCircle size={16} />
                          Comments {comments[post.permlink]?.length || 0}
                        </div>
                        <div style={styles.payoutInfo}>
                          Est. Payout 💰 ${parseFloat(post.pending_payout_value).toFixed(2)}
                        </div>
                      </div>

                      <div style={{display: 'flex', gap: '1rem', marginTop: '1rem'}}>
                        <button
                          onClick={() => handleUpvote(post.author, post.permlink)}
                          style={styles.upvoteButton}
                        >
                          <FiThumbsUp /> Upvote
                        </button>

                        <button
                          onClick={() => handleSendTokens(post.author)}
                          style={styles.sendTokensButton}
                        >
                          Send Tokens
                        </button>
                      </div>

                      {comments[post.permlink]?.length > 0 && (
                        <div style={styles.comments}>
                          <h4 style={styles.commentTitle}>
                            <FiMessageCircle size={16} />
                            RECENT COMMENTS
                          </h4>
                          <div style={styles.commentList}>
                            {comments[post.permlink].slice(0, 3).map((comment, idx) => (
                              <div key={idx} style={styles.comment}>
                                <div className="author" style={{ color: '#ffffff' }}>
                                  <img
                                    src={`https://images.hive.blog/u/${comment.author}/avatar/small`}
                                    alt={comment.author}
                                    style={{
                                      width: '2.5rem',
                                      height: '2.5rem',
                                      borderRadius: '50%',
                                      border: '2px solid rgba(93, 47, 189, 0.3)',
                                      padding: '2px',
                                      background: 'linear-gradient(45deg, #5d2fbd, rgba(93, 47, 189, 0.3))',
                                      objectFit: 'cover',
                                      boxShadow: '0 4px 12px rgba(93, 47, 189, 0.2)'
                                    }}
                                  />
                                  <div style={{ flex: 1, color: '#ffffff' }}>
                                    <span style={{ color: '#ffffff' }}>@{comment.author}</span>
                                  </div>
                                </div>
                                <div className="content" style={{ color: '#ffffff' }}>
                                  {comment.body}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              ) : (
                <div style={styles.empty}>
                  No posts found. Try adjusting your search or filters.
                </div>
              )}
            </>
          ) : activeTab === 'create' ? (
            <div style={styles.createPostForm}>
              <div style={styles.formHeader}>
                <h2 style={styles.formTitle}>Create Your Story</h2>
                <p style={styles.formSubtitle}>Share your insights, experiences, and ideas with the Hive community</p>
              </div>
              <form onSubmit={handleCreatePost}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <FiEdit /> Title
                  </label>
                  <input
                    type="text"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="Enter an engaging title for your post"
                    style={styles.textInput}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <FiEdit /> Content
                  </label>
                  <textarea
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                    placeholder="Write your post content here... Use Markdown for formatting (e.g., **bold**, *italic*, # heading)"
                    style={styles.textarea}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <FiTag /> Tags
                  </label>
                  <input
                    type="text"
                    value={postTags}
                    onChange={(e) => setPostTags(e.target.value)}
                    placeholder="Add space-separated tags (e.g., hive blog crypto development)"
                    style={styles.textInput}
                    required
                  />
                </div>
                {postBody && (
                  <div style={styles.previewSection}>
                    <h4 style={styles.previewTitle}>
                      <FiEdit /> Live Preview
                    </h4>
                    <div
                      style={styles.content}
                      dangerouslySetInnerHTML={{
                        __html: marked(postBody),
                      }}
                    />
                  </div>
                )}
                <button
                  type="submit"
                  style={styles.submitButton}
                  disabled={isSubmitting}
                >
                  <FiEdit />
                  {isSubmitting ? 'Publishing...' : 'Publish Story'}
                </button>
              </form>
            </div>
          ) : (
            <HiveFreelance />
          )}
        </div>
      </div>
    </div>
  );
};

export default HiveBlogs;
