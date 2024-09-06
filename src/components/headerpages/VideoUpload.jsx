import { Button, Card, Dropdown, Progress, Spinner } from "flowbite-react"
import { useContext, useId, useState } from "react";
import video_pluse from "../../images/video_pluse.png"
import axios from "axios";
import { BASE_URL } from "../appconstants/BaseUrl"
import { AuthContext } from "../authprovider/AuthProvider";
import { ModelAlert } from "../popup/ModelAlert";
import { Helmet, HelmetProvider } from "react-helmet-async"
import { categories } from "../appconstants/Category"
import "./VideoUpload.css"

function VideoUpload() {
    let [formData, setFormData] = useState({ title: "", description: "", category: "", file: null })
    let id = useId();
    let { setProgress } = useContext(AuthContext);
    let [uploadProgress, setUploadProgress] = useState(0)
    let [uploading, setUploading] = useState(false);
    let [openModal, setOpenModal] = useState(false)
    let [modelMessage, setModelMessage] = useState("")
    let [errorMessage, setErrorMessage] = useState({ title: "", description: "", category: "", file: "" });

    let handleFormData = ({ target: { name, value, files } }) => {
        if (name === "file") {
            setFormData({ ...formData, [name]: files[0] });
            setErrorMessage({ ...errorMessage, [name]: "" });
        } else {
            setFormData({ ...formData, [name]: value });
            setErrorMessage({ ...errorMessage, [name]: "" });
        }
    }

    let handleFormSubmit = async (e) => {
        e.preventDefault();
        setUploading(true)
        try {
            setProgress(70)
            const response = await axios.post(`${BASE_URL}videos`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    onUploadProgress: (progressEvent) => {
                        const progressData = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setUploadProgress(progressData);
                    }
                }
            );
            console.log(response)
            setProgress(90)
            if (response.status === 201) {
                setFormData({ title: "", description: "", category: "", file: null })
                setModelMessage(response.data.message)
                setOpenModal(true)
            }
        } catch (error) {
            console.log(error)
            setErrorMessage({ ...errorMessage, ...error.response.data.rootCause })
        } finally {
            setProgress(100)
            setUploading(false)
            setUploadProgress(0)
        }
    }
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Upload Video - Video Streaming App</title>
                    <meta name="description" content="Upload your own video with different Categories and post and enhance you and show your work online" />
                </Helmet>

                <ModelAlert openModal={openModal} setOpenModal={setOpenModal} modelMessage={modelMessage} previousLocation="/" emoji={"👍"} />

                <section className="flex justify-center m-8">

                    <Card className="max-w-sm mx-5">
                        <h1 className='dark:text-lime-300 text-lime-600 text-2xl text-center'>Upload Videos</h1>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-3">
                                <div className="relative">
                                    <input type="text" id={id + "title"}
                                        aria-describedby="title_help"
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white dark:border-purple-500 border-purple-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                                        placeholder="Video Title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleFormData} />
                                    <label htmlFor={id + "title"} className="absolute text-sm text-purple-600 dark:text-purple-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                                        Video Title
                                    </label>
                                </div>
                                <p id="title_help" className="mt-2 text-xs text-red-600 dark:text-red-400"><span className="font-medium">{errorMessage.title}</span></p>
                            </div>

                            <div className="mb-2">
                                <div className="relative">
                                    <input type="text" id={id + "desc"}
                                        aria-describedby="desc_help"
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white dark:border-purple-500 border-purple-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                                        placeholder="Video Description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleFormData} />
                                    <label htmlFor={id + "desc"} className="absolute text-sm text-purple-600 dark:text-purple-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                                        Video Description
                                    </label>
                                </div>
                                <p id="desc_help" className="mt-2 text-xs text-red-600 dark:text-red-400"><span className="font-medium">{errorMessage.description}</span></p>
                            </div>

                            <div className="mb-2 mt-3 drop-down-width">
                                <div className="relative">
                                    <Dropdown
                                        label={formData.category || "Select a category"}
                                        color="purple"
                                        outline={true}
                                        className="z-50"
                                    >
                                        {categories.map((val, index) => (
                                            <Dropdown.Item
                                                key={index}
                                                onClick={() => handleFormData({ target: { name: "category", value: val.toUpperCase() } })}
                                            >
                                                {val}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown>
                                </div>
                                <p id="category_help" className="mt-2 text-xs text-red-600 dark:text-red-400"><span className="font-medium">{errorMessage.category}</span></p>
                            </div>

                            <div className="flex items-center justify-center mb-2">
                                <div className="shrink-0">
                                    <img
                                        className="h-16 w-16 object-cover cursor-pointer"
                                        src={video_pluse}
                                        alt="Current profile photo"
                                        onClick={() => document.getElementById(id + "video").click()}
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        type="file"
                                        id={id + "video"}
                                        aria-describedby="video_help"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        name="file"
                                        onChange={handleFormData}
                                    />
                                    <input
                                        type="text"
                                        id={id + "video"}
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white dark:border-purple-500 border-purple-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                                        placeholder="Video"
                                        name="file"
                                        value={formData.file ? formData.file.name : ""}
                                        readOnly
                                    />
                                    <label
                                        htmlFor={id + "video"}
                                        className="absolute text-sm text-purple-600 dark:text-purple-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                    >
                                        Choose Video
                                    </label>
                                </div>
                            </div>
                            <p id="title_help" className="mt-2 text-xs text-red-600 dark:text-red-400 mb-2"><span className="font-medium">{errorMessage.file}</span></p>
                            {uploading && <div className="mb-3">
                                <Progress progress={uploadProgress}
                                    color="purple"
                                    size="lg"
                                    labelProgress
                                />
                            </div>}
                            <div className="flex justify-center">
                                <Button type="submit" outline gradientDuoTone="purpleToBlue" disabled={uploading ? true : false}>
                                    {uploading ? <><Spinner className="mr-2" aria-label="Loading" />Uploading...</> : "Upload"}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </section>
            </HelmetProvider>
        </>
    )
}

export default VideoUpload
