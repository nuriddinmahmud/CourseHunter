function checkRole(data) {
  return (req, res, next) => {
    let { role } = req.user;
    console.log(role);
    if (!data.includes(role)) {
      return res.status(405).send({ message: " Not allowed ❗" });
    }
    next();
  };
}

export default checkRole;
