interface Props {
  text: string;
  className?: string;
}

const Alret = ({ text, className }: Props) => {
  return (
    <div className="my-2">
      <p className="text-center text-red-500">{text}</p>
    </div>
  );
};

export default Alret;
