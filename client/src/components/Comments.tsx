/**
 * Comments Component - With Admin Features & Better Profile UI
 * Features: Delete, Reply, Nested comments, Profile styling
 */

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, UserCircle2, Loader2, Send, Upload, X, Trash2, Reply, AlertCircle } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { useAuth } from '@/_core/hooks/useAuth';
import { ENV } from '@/const';

interface CommentData {
  id: number;
  userName: string;
  content: string;
  profileImage: string | null;
  isPinned: boolean;
  parentId: number | null;
  createdAt: Date;
  replies?: CommentData[];
}

export default function Comments() {
  const { user } = useAuth();
  const { data: comments = [], refetch } = trpc.comments.list.useQuery();
  const createComment = trpc.comments.create.useMutation({
    onSuccess: () => {
      toast.success('Comment posted successfully!');
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to post comment');
    },
  });

  const deleteComment = trpc.comments.delete.useMutation({
    onSuccess: () => {
      toast.success('Comment deleted successfully!');
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete comment');
    },
  });

  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if current user is admin (owner)
  const isAdmin = user?.openId === ENV.ownerOpenId;

  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        if (e.target) e.target.value = '';
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        if (e.target) e.target.value = '';
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !userName.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    
    createComment.mutate({ 
      userName, 
      content: newComment, 
      profileImageBase64: imagePreview || undefined,
      parentId: replyingTo || undefined,
    });
    
    setNewComment('');
    setUserName('');
    setImagePreview(null);
    setImageFile(null);
    setReplyingTo(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this comment and all its replies?')) {
      deleteComment.mutate({ id });
    }
  };

  const handleReply = (commentId: number, commentUserName: string) => {
    setReplyingTo(commentId);
    setUserName(''); // Clear for user to enter their name
    toast.info(`Replying to ${commentUserName}`);
  };

  const formatDate = (timestamp: Date) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const pinnedComment = comments.find(c => c.isPinned);
  const regularComments = comments.filter(c => !c.isPinned);

  const renderComment = (comment: CommentData, isReply: boolean = false) => (
    <div 
      key={comment.id} 
      data-aos="fade-up"
      className={`${
        isReply 
          ? 'ml-12 bg-white/3 rounded-lg p-4 border border-white/5' 
          : comment.isPinned
            ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border-2 border-blue-500/30 shadow-lg shadow-blue-500/10'
            : 'bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Profile Image */}
        {comment.profileImage ? (
          <img
            src={comment.profileImage}
            alt={`${comment.userName}'s profile`}
            className={`${
              isReply ? 'w-10 h-10' : 'w-14 h-14'
            } rounded-full object-cover border-2 ${
              comment.isPinned ? 'border-blue-400/50' : 'border-white/20'
            } shadow-lg`}
          />
        ) : (
          <div className={`${
            isReply ? 'w-10 h-10 p-2' : 'w-14 h-14 p-3'
          } rounded-full ${
            comment.isPinned ? 'bg-blue-500/20' : 'bg-gradient-to-br from-white/10 to-white/5'
          } flex items-center justify-center`}>
            <UserCircle2 className={`${
              isReply ? 'w-6 h-6' : 'w-8 h-8'
            } ${comment.isPinned ? 'text-blue-400' : 'text-gray-400'}`} />
          </div>
        )}

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h4 className={`font-semibold ${
              comment.isPinned ? 'text-blue-300' : 'text-white'
            }`}>{comment.userName}</h4>
            {comment.isPinned && (
              <span className="px-2 py-0.5 text-xs bg-blue-500/30 text-blue-300 rounded-full font-medium">
                Pinned
              </span>
            )}
            <span className="text-xs text-gray-400">{formatDate(comment.createdAt)}</span>
            
            {/* Admin Actions */}
            {isAdmin && (
              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={() => handleReply(comment.id, comment.userName)}
                  className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                  title="Reply"
                >
                  <Reply className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          <p className={`${
            isReply ? 'text-sm' : 'text-base'
          } text-gray-300 leading-relaxed`}>{comment.content}</p>

          {/* Reply Button for non-admin users */}
          {!isAdmin && !isReply && (
            <button
              onClick={() => handleReply(comment.id, comment.userName)}
              className="mt-3 text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
            >
              <Reply className="w-3 h-3" />
              Reply
            </button>
          )}
        </div>
      </div>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-3">
          {comment.replies.map(reply => renderComment(reply, true))}
        </div>
      )}
    </div>
  );

  return (
    <div className="mt-12 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <MessageCircle className="w-6 h-6 text-blue-400" />
        <h3 className="text-2xl font-bold text-white">Comments</h3>
        <span className="ml-auto text-sm text-gray-400">
          {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
        </span>
      </div>

      {/* Admin Badge */}
      {isAdmin && (
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <AlertCircle className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-blue-300">You're logged in as admin. You can delete and reply to comments.</span>
        </div>
      )}

      {/* Reply Indicator */}
      {replyingTo && (
        <div className="flex items-center justify-between px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <span className="text-sm text-blue-300">
            Replying to comment...
          </span>
          <button
            onClick={() => setReplyingTo(null)}
            className="text-blue-400 hover:text-blue-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-gradient-to-br from-white/5 to-white/3 rounded-xl p-6 border border-white/10 shadow-xl">
        <div>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            maxLength={15}
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
            required
          />
        </div>

        <div>
          <textarea
            value={newComment}
            maxLength={200}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment..."
            className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none min-h-[100px]"
            required
          />
          <div className="flex justify-end mt-1">
            <span className="text-xs text-gray-500">{newComment.length}/200</span>
          </div>
        </div>

        {/* Image Upload */}
        <div className="flex items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
          {imagePreview ? (
            <div className="flex items-center gap-3 flex-1 p-3 bg-black/30 rounded-lg border border-white/10">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-12 h-12 rounded-lg object-cover border border-white/20"
              />
              <span className="text-sm text-gray-300 flex-1 truncate">{imageFile?.name}</span>
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null);
                  setImageFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-black/30 border border-white/10 text-gray-400 hover:border-blue-500/50 hover:text-blue-400 transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span className="text-sm">Add photo</span>
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={createComment.isPending}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {createComment.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Posting...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>{replyingTo ? 'Post Reply' : 'Post Comment'}</span>
            </>
          )}
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {pinnedComment && renderComment(pinnedComment)}
        
        {regularComments.length === 0 && !pinnedComment ? (
          <div className="text-center py-12" data-aos="fade-in">
            <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No comments yet. Be the first!</p>
          </div>
        ) : (
          regularComments.map(comment => renderComment(comment))
        )}
      </div>
    </div>
  );
}
