const ProgressUtil = {
    getProgressColor(progressValue) {
        if (progressValue < 25) return "secondary";
        else if (progressValue > 25 && progressValue <= 50) return "warning";
        else if (progressValue > 50 && progressValue <= 75) return "info";
        else if (progressValue > 100) return "error";
        else return "success";
    },
};

export default ProgressUtil;
