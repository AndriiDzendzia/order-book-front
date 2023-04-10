import { Typography } from '@mui/material';

type Props = {
  text?: string;
};

const Loader: React.FC<Props> = ({ text }) => {
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center bg-white/50 
                     absolute top-[50%] -translate-y-[50%] left-0 
                     md:rounded-2xl z-50`}
    >
      <div className="loader" />
      {text && (
        <Typography
          variant="h4"
          component="p"
          className="text-grey-500"
        >
          {text}
        </Typography>
      )}
    </div>
  );
};

export default Loader;
