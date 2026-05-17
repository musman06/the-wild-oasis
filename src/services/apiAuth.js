import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function signUp({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        avatar: "",
        fullName,
      },
    },
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function login(email, password) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data?.user;
}

export async function updateCurrentUser({ password, fullName, avatarFile }) {
  // 1. update fullName or password
  let changedData;

  if (password) changedData = { password };
  if (fullName) changedData = { data: { fullName } };

  let userData;
  if (changedData) {
    const { data, error } = await supabase.auth.updateUser(changedData);
    userData = data;

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  if (!avatarFile) return userData;

  // 2. upload avatar
  const avatarName = `${userData.user.id}-${avatarFile.name}`.replaceAll(
    "/",
    "",
  );
  const avatarPath = `${supabaseUrl}/storage/v1/object/public/avatars/${avatarName}`;
  console.log(avatarPath);

  // const { data, error } = await supabase.auth.updateUser({
  //   data: { fullName, avatar: avatarPath },
  // });

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(avatarName, avatarFile);

  if (storageError) {
    console.error(storageError);
    throw new Error("User avatar cannot be updated");
  }

  // 3. update user avatar
  changedData = { data: { avatar: avatarPath } };
  const { data, error } = await supabase.auth.updateUser(changedData);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
