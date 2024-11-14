const hiddenPosts = ["artist-interview-william-lukas"];

const isHiddenPost = function (req, res, next) {
  const { post_name: postName } = req.params;

  return hiddenPosts.includes(postName)
    ? res.status(200).json({ redirect: true, url: "/" })
    : next();
};

module.exports = isHiddenPost;
