import APISupport from "../../../../../utils/APISupport";

/**
 * Response Code : 204
 */
const Index = APISupport().get(async (req, res) => {
    res.status(204).json({ message: "No Content", code: 204 });
});

export default Index;
