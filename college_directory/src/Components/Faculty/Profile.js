import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";
import {
  Box,
  Button,
  TextField,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import { uploadImage } from "../../API/user";
import samplePic from "../../assets/college_logo.jpg";
import EditIcon from "@mui/icons-material/Edit";
import { getFacultyProfile, updateFacultyProfile } from "../../API/faculty";
import { setProfile } from "../../Redux/facultySlice";

const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state?.faculty?.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    photo: samplePic,
    department: "",
    regNumber: "",
    classlist: [],
    officeHours: ""
  });
  const [file, setFile] = useState(null);

  const {
    isLoading,
    isError,
    data: profileData,
    refetch: refetchProfile,
  } = useQuery("profileFetch", getFacultyProfile, {
    onSuccess: (result) => {
      if (result) {
        dispatch(setProfile(result));
        const { user, photo } = result;
        setFormData({
          name: user?.name || "",
          email: user?.email || "",
          phone: user?.phone || "",
          photo: photo || samplePic,
          classlist: user?.classList || "",
          officeHours: user?.officeHours || ""
        });
      }
    },
  });

  const updateMutation = useMutation(updateFacultyProfile, {
    onSuccess: (data) => {
      setIsEditing(false);
      dispatch(setProfile(data));
      refetchProfile();
    },
    onError: () => {
      setIsEditing(false);
      refetchProfile();
    },
  });

  useEffect(() => {

    setFormData({
      name: profileData?.user?.name || "",
      email: profileData?.user?.email || "",
      phone: profileData?.user?.phone || "",
      photo: profileData?.photo || samplePic,
      officeHours: profileData?.officeHours || ""
    });
  }, [profileData]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleEditSubmit = async () => {
    let photoURL = formData.photo;
    if (file) {
      try {
        photoURL = await uploadImage(file);
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    const dataToUpdate = { ...formData, photo: photoURL };
    updateMutation.mutate(dataToUpdate);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({
      name: profileData?.user?.name || "",
      email: profileData?.user?.email || "",
      phone: profileData?.user?.phone || "",
      photo: profileData?.photo || samplePic,
      officeHours: profileData?.officeHours || ""
    });
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h5" color="error">
          Error fetching profile data. Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="space-between" alignItems="flex-start" padding={2}>
      <Box marginRight={2}>
        <img
          src={formData?.photo}
          alt="Profile"
          style={{ width: 250, height: 200, borderRadius: "90%" }}
        />
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginTop: 10 }}
          />
        )}
      </Box>
      <Box flexGrow={1}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Personal Profile</Typography>
          {!isEditing && (
            <IconButton onClick={handleEditToggle}>
              <EditIcon />
            </IconButton>
          )}
        </Box>
        <TextField
          label="Name"
          name="name"
          value={isEditing ? formData?.name : profileData?.user?.name}
          onChange={handleChange}
          fullWidth
          required
          disabled={!isEditing}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Email"
          name="email"
          value={isEditing ? formData?.email : profileData?.user?.email}
          onChange={handleChange}
          fullWidth
          required
          disabled={!isEditing}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Phone"
          name="phone"
          value={isEditing ? formData?.phone : profileData?.user?.phone}
          onChange={handleChange}
          fullWidth
          required
          disabled={!isEditing}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="officeHours"
          name="officeHours"
          value={isEditing ? formData?.officeHours : profileData?.officeHours}
          onChange={handleChange}
          fullWidth
          required
          disabled={!isEditing}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Typography variant="body1"> Faculty ID Number: {profileData?.userId}</Typography>
        <Typography variant="body1">Department: {profileData?.departmentName}</Typography>

        {isEditing && (
          <Box display="flex" justifyContent="flex-end" marginTop={2} gap={2}>
            <Button onClick={handleEditSubmit} variant="contained" color="primary">
              Submit
            </Button>
            <Button onClick={handleCancelEdit} variant="outlined" color="secondary">
              Cancel
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
