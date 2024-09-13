import supabase from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.log("login==>>", data);

  if (error) throw new Error(error.message);
  return data;
}
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return;
  const { data, error } = await supabase.auth.getUser();
  console.log("getCurrentUser==>>", data);
  if (error) throw new Error(error.message);
  return data?.user;
}
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}