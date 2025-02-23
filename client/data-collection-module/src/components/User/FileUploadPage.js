import React, { useState } from "react";
import api from "../../services/api";
import languages from "../../data/languages.json";
import { useSelector } from "react-redux";
import { FaCloudUploadAlt, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const FileUploadPage = () => {
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [fileType, setFileType] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const userId = useSelector(state => state.auth.userId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (sourceLanguage === targetLanguage) {
      setError("Source and target languages cannot be the same.");
      return;
    }

    if (!sourceLanguage || !targetLanguage || !fileType || !file) {
      setError("Please fill out all fields and upload a file.");
      return;
    }

    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);
    formData.append("sourceLanguageId", sourceLanguage);
    formData.append("targetLanguageId", targetLanguage);

    try {
      const response = await api.post("/files/upload", formData);
      setMessage(response.data.message || "File uploaded successfully!");
      setFile(null);
      setSourceLanguage("");
      setTargetLanguage("");
      setFileType("");
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Error uploading file. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 py-10 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Upload File</h1>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Source Language */}
          <div>
            <label className="flex items-center text-lg font-medium mb-2 text-gray-700">
              Source Language
            </label>
            <select
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-800"
            >
              <option value="" disabled>Select source language</option>
              {languages.map((lang) => (
                <option key={lang.language_id} value={lang.language_id}>
                  {lang.language_name}
                </option>
              ))}
            </select>
          </div>

          {/* Target Language */}
          <div>
            <label className="flex items-center text-lg font-medium mb-2 text-gray-700">
              Target Language
            </label>
            <select
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-800"
            >
              <option value="" disabled>Select target language</option>
              {languages.map((lang) => (
                <option key={lang.language_id} value={lang.language_id}>
                  {lang.language_name}
                </option>
              ))}
            </select>
          </div>

          {/* File Type */}
          <div>
            <label className="flex items-center text-lg font-medium mb-2 text-gray-700">
              File Type
            </label>
            <select
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-800"
            >
              <option value="" disabled>Select file type</option>
              <option value="doc">Word Document</option>
              <option value="excel">Excel Sheet</option>
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="flex items-center text-lg font-medium mb-2 text-gray-700">
              Upload File
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-800"
            />
          </div>

          {/* Upload Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium text-lg flex items-center justify-center hover:bg-blue-600 transition"
          >
            <FaCloudUploadAlt className="mr-2" />
            Upload
          </button>

          {/* Error Message */}
          {error && (
            <p className="mt-4 text-center text-lg text-red-500 font-semibold flex items-center justify-center">
              <FaExclamationCircle className="mr-2" />
              {error}
            </p>
          )}

          {/* Success Message */}
          {message && (
            <p className="mt-4 text-center text-lg text-green-500 font-semibold flex items-center justify-center">
              <FaCheckCircle className="mr-2" />
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default FileUploadPage;
