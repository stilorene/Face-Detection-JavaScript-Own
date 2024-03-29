// gibt die einzelnen Emotionen in der Konsole aus
detections.forEach(detection => {
    const expressions = detection.expressions;
    // expressions is an object containing probabilities for different emotions (e.g., 'neutral', 'happy', 'sad', etc.)
    const mostLikelyEmotion = Object.keys(expressions).reduce((emotion, key) => expressions[key] > expressions[emotion] ? key : emotion);
    detectedEmotions.push(mostLikelyEmotion); // Füge die ermittelte Emotion dem Array hinzu
    return detectedEmotions;
  });
  