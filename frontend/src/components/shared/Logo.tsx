import { Typography } from "@mui/material";

import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "30px",
      }}
    >
      <Link to="/">
        <img
          src="robot.jpg"
          alt="robot"
          width="30px"
          height="30px"
          className="image-inverted"
        />
        <Typography sx={{ display : {md:"block", sm: "none", xs: "none" } ,mr: "auto",fontWeight:"800",textShadow: "2px 2px 20px #000"}}
        >
            <span style={{ fontSize: "20px" }}>MERN</span>-GPT
        </Typography>
      </Link>
    </div>
  );
};

export default Logo;
