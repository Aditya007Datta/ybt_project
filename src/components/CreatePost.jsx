import Image from "next/image";
import React, { useState } from "react";

import preview from "../assets/preview.webp";
import { getRandomPrompt } from "../random/page";

import FormField from "./FormField";
import Loader from "./Loader";

const CreatePost = () => {
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(
          "https://wise-queens-study-34-142-189-113.loca.lt/docs#/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: form.prompt,
            }),
          }
        );

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please provide proper prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(
          "https://wise-queens-study-34-142-189-113.loca.lt/docs#/default/text2img_text2img_post",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...form }),
          }
        );

        await response.json();
        alert("Success");
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Generate me an image");
    }
  };

  return (
    // <div className="bg-page-gradient pt-navigation-height">
    <div className="min-h-[calc(100vh-73px)] w-full bg-[#171b29] px-4 py-8 sm:p-8">
      <section className="mx-auto max-w-7xl">
        <div>
          <h1 className="text-[32px] font-extrabold text-[#e0e1e9]">Create</h1>
          <p className="mt-2 max-w-[500px] text-[14px] text-[#e6eaed]">
            Generate an imaginative image{" "}
          </p>
        </div>

        <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <FormField
              labelName="Your Name"
              type="text"
              name="name"
              placeholder="Eg., Arindom Chatterjee"
              value={form.name}
              handleChange={handleChange}
            />

            <FormField
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder="Rohit running after Sudipta"
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />

            <div className="border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 w-64 h-64 relative flex items-center justify-center rounded-lg border bg-white p-3 text-sm">
              {form.photo ? (
                <Image
                  src=""
                  alt={form.prompt}
                  className="h-full w-full object-contain"
                />
              ) : (
                <Image
                  src={preview}
                  alt="preview"
                  className="h-9/12 w-9/12 object-contain opacity-40"
                  width={1080}
                  height={1080}
                />
              )}

              {generatingImg && (
                <div className="absolute inset-0 z-0 flex items-center justify-center rounded-lg bg-[rgba(167,145,145,0.5)]">
                  <Loader />
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 flex gap-5">
            <button
              type="button"
              onClick={generateImage}
              className=" mt-3 w-full rounded-xl bg-[#21bf0f] py-3 px-5 text-center text-sm font-semibold"
            >
              {generatingImg ? "Generating..." : "Generate"}
            </button>
          </div>
        </form>
      </section>
    </div>
    // </div>
  );
};

export default CreatePost;
