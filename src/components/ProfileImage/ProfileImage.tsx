import Image from "next/image";
import React from "react";

type ProfileImageProps = {
  src?: string;
  className?: string;
};

export const ProfileImage = ({ src, className = "" }: ProfileImageProps) => {
  return (
    <div
      className={`routeded-full relative h-12 w-12 overflow-hidden ${className}`}
    >
      {!src ? null : <Image src={src} alt="profile image" quality={100} fill />}
    </div>
  );
};
