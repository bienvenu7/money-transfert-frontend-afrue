import Image from "next/image";
import React, { forwardRef } from "react";

type Props = {};

const Show = forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <div className="main__show">
      <h2>Transferts terminés avec succès</h2>
      <div className="main__show--box">
        <Image
          priority={true}
          loading="eager"
          quality={100}
          src="/show.png"
          alt=""
          fill
        />
        <Image
          className="phone"
          priority={true}
          loading="eager"
          quality={100}
          src="/bg-t.png"
          alt=""
          width={200}
          height={200}
        />
      </div>
    </div>
  );
});

Show.displayName = "Show";

export default Show;
