import { useSession } from "next-auth/react";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Button } from "../Button";
import { ProfileImage } from "../ProfileImage/ProfileImage";
import { api } from "~/utils/api";

const updateTextAreaSize = (textArea?: HTMLTextAreaElement) => {
  if (!textArea) return;
  textArea.style.height = "0";
  textArea.style.height = `${textArea.scrollHeight}px`;
};

export const Form = () => {
  const session = useSession();
  const user = session.data?.user;
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaSize(textArea);
    textAreaRef.current = textArea;
  }, []);

  useLayoutEffect(() => {
    updateTextAreaSize(textAreaRef.current);
  }, [inputValue]);

  const createBlast = api.blast.create.useMutation({
    onSuccess: (newBlast) => {
      console.log(newBlast);
      setInputValue("");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createBlast.mutate({ content: inputValue });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 border-b px-4 py-2"
    >
      <div className="flex gap-4">
        {user?.image && <ProfileImage src={user.image} />}
        <textarea
          ref={inputRef}
          style={{ height: 0 }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none"
          placeholder="What's blastin'?"
        ></textarea>
      </div>
      <Button className="self-end">Blast</Button>
    </form>
  );
};
