type CommentProps = {
  username: string;
  comment: string;
  date: string;
  rating: number;
};

const Comment = (props: CommentProps) => {
  return (
    <div className="flex flex-row items-center justify-start">
      <div className="flex flex-col items-center justify-center">
        <p className="text-center">{props.username}</p>
      </div>
      <div className="flex flex-col items-start justify-center">
        <p>{props.comment}</p>
        <p>{props.date}</p>
      </div>
      <div>
        <p>{props.rating}</p>
      </div>
    </div>
  );
};
export default Comment;
