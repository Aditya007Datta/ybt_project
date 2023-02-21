import Image from "next/image";
import React, { useState, useEffect } from "react";

// import { preview } from '../assets';
import { getRandomPrompt } from "../random/page";

import FormField from "./FormField";
import Loader from "./Loader";
import { auth, database } from '../firebase';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { useRouter } from 'next/router';

const CreatePost = () => {
  const [ID, setID] = useState(null);
  const [text, setText] = useState('');
  const [fireData, setFireData] = useState([]);
  const [file, setFile] = useState("");
  const [data, setData] = useState({});

  const databaseRef = collection(database, 'YBS');

  let router = useRouter()

  useEffect(() => {
    let token = sessionStorage.getItem('Token')
    if (token) {
      getData()
    }
    if (!token) {
      router.push('/register')
    }
  }, [])

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      navigate(-1)
    } catch (err) {
      console.log(err);
    }
  };

  const addData = () => {
    addDoc(databaseRef, {
      text: text,
    })
      .then(() => {
        getData()
        setText('')
      })
      .catch((err) => {
        console.error(err);
      })
  }

  const getData = async () => {
    await getDocs(databaseRef)
      .then((response) => {
        setFireData(response.docs.map((data) => {
          return { ...data.data(), id: data.id }
        }))
      })
  }

  const getID = (id, text) => {
    setID(id)
    setText(text)
  }

  const logout = () => {
    sessionStorage.removeItem('Token')
    router.push('/register')
  }

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
        const response = await fetch("", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

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
        const response = await fetch("", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...form }),
        });

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
                  src=""
                  alt="preview"
                  className="h-9/12 w-9/12 object-contain opacity-40"
                />
              )}

              {generatingImg && (
                <div className="absolute inset-0 z-0 flex items-center justify-center rounded-lg bg-[rgba(239,82,82,0.5)]">
                  <Loader />
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 flex gap-5">
            <button
              type="button"
              onClick={generateImage}
              className=" px-2.5 w-full rounded-md bg-[#21bf0f] py-3 text-center text-sm font-medium text-white sm:w-auto"
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
