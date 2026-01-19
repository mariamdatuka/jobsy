import Input from "../components/general/Input";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MainButton from "../components/general/Button";
import { Stack, styled } from "@mui/material";
import logo from "@src/assets/images/imgLogo.png";
import { SignInSchema } from "@src/schemas/schemas";
import Text from "@src/components/general/Text";
import { Link } from "react-router";
import { useSupabaseMutation } from "@src/hooks/useSupabaseMutation";
import { loginUser, type LoginUserData } from "@src/services/login";
import { useNavigate } from "react-router";

const Login = () => {
  const methods = useForm({
    resolver: yupResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });

  const navigate = useNavigate();

  const { isPending, isError, error, mutate } = useSupabaseMutation(loginUser, {
    onSuccess: () => {
      methods.reset();
      navigate("/dashboard");
    },
  });

  const handleUserLogin = async (userData: LoginUserData) => {
    mutate(userData);
  };

  return (
    <>
      <Container>
        <img src={logo} alt="Logo" width="150px" />
        <Text
          variant="h4"
          color="info"
          fontFamily="Viga"
          sx={{ mt: "20px", mb: "10px" }}
        >
          JOBSY
        </Text>
        <Text
          variant="h6"
          color="text.primary"
          fontFamily="Viga"
          sx={{ mb: "20px" }}
        >
          Your Orginized Job Search
        </Text>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleUserLogin)}>
            <Stack gap="15px">
              {isError && <Text color="error">{error?.message}</Text>}
              <Input label="Email" name="email" />
              <Input label="Password" name="password" />
              <Stack direction="row" justifyContent="space-between">
                <Link
                  to="/signup"
                  style={{ color: "#999EA1", fontSize: "14px" }}
                >
                  Sign Up
                </Link>
                <Link
                  to="/passwordrecovery"
                  style={{
                    color: "#FB344F",
                    fontSize: "14px",
                    textDecoration: "none",
                  }}
                >
                  forgot password
                </Link>
              </Stack>
              <MainButton
                title="Login"
                type="submit"
                sx={{ mt: "10px" }}
                disabled={isPending}
              />
            </Stack>
          </form>
        </FormProvider>
      </Container>
    </>
  );
};

export default Login;

export const Container = styled(Stack)({
  height: "100vh",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
});

// app.post("/order-todos/:id", async (req, res) => {
//   const id = req.params.id;
//   // index_number of the task above the dragged and dropped task
//   let prevElIndexNumber = req.body.prevElIndexNumber;
//   // index_number of the task under the dragged and dropped task
//   let nextElIndexNumber = req.body.nextElIndexNumber;
//   // a variable containing the index_number of the dragged and dropped task
//   let currElIndexNumber;

//   // prevElIndexNumber === undefined, this is happended when the drag-and-drop task is at the top of the to-do list.
//   // Since there is no upper task, set the index_number of the lower task - 512 as the currElIndexNumber
//   if (prevElIndexNumber === undefined) {
//     currElIndexNumber = nextElIndexNumber - 512;
//   // nextElIndexNumber === undefined, this is happended when the dragged-and-dropped task is at the bottom of the to-do list
//   // Set the index_number of the task above + 512 as the currElIndexNumber
//   } else if (nextElIndexNumber === undefined) {
//     currElIndexNumber = prevElIndexNumber + 512;
//   // If there are tasks both above and below the dragged-and-dropped task, then
//   // currElIndexNumber = (index_number of the top task + index_number of the bottom task)/2
//   } else {
//     currElIndexNumber = Math.floor((prevElIndexNumber + nextElIndexNumber) / 2);
//   }

//     try {
//     // Update currElIndexNumber as the index_number of the new task
//     await util.promisify(connection.query).bind(connection)(
//       `UPDATE todo SET index_number = ${currElIndexNumber} where id = ${id}`
//     );

//     // When index_number overlaps
//     if (
//       Math.abs(currElIndexNumber - prevElIndexNumber) <= 1 ||
//       Math.abs(currElIndexNumber - nextElIndexNumber) <= 1
//     ) {
//       // Get index_number in ascending order from 1~ (= orderedData), then update the table
//       const orderedData = await util
//         .promisify(connection.query)
//         .bind(connection)(
//         `SELECT *, ROW_NUMBER() OVER (ORDER BY index_number) as orderedData FROM todo;`
//       );
//       await Promise.all(
//         orderedData.map(async (element) => {
//           await util.promisify(connection.query).bind(connection)(
//             `UPDATE todo SET index_number = ${element.orderedData}*1024 where id = ${element.id}`
//           );
//         })
//       );
//     }
//     res.end();
//   } catch (e) {
//     res.status(500).send({ e });
//   }
// });
