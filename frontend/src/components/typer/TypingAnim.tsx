import { TypeAnimation } from "react-type-animation";

export const TypingAnim = () => {
    return (
        <TypeAnimation
          sequence={[
            //same substring at the start will only be typed pnce,initially
            "Chat With You OWN ai",
            1000,
            "Built your OpenAI",
            2000,
            "You own Customized one",
            1500,
            
          ]}
          speed={50}
          style={{ fontSize: "60px",
                   color: "white",
                   display: "inline-block",
                   textShadow: "1px 1px 20px #000",
           }}
          repeat={Infinity}
          />
        );
};