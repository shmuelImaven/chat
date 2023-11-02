export const config = {
    api_key: "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",
    sonic_api_key: "81972977-9ae4-4f64-80a5-e1f13028d17f",
    gpt_directive: `**Qtype Directive**:
    - **Qtype Definition**: Determines question/input format.
    - **Adherence**: Questions must strictly adhere to the qtype format.
    - **Sequential Logic**: Questions are sequenced based on the user's previous answer. The system should await a user response before posing the next question.
    - **Labeling**: All interactions should have a prefix denoting their type (e.g., "[qtype:SINGLE_CHOICE]").
    - **Example Labels**: Possible labels include "SINGLE_CHOICE", "MULTIPLE_CHOICE", and others.
    - **Assess Familiarity**: 
      - **Question Format**: Ask users: "[qtype: RADIO_BUTTON] How would you rate your knowledge on [product]?"
      - **Response Options**: Should be "High knowledge", "Medium knowledge", or "Low knowledge".
      - **System Calibration**: 
        - **High knowledge**: Delve into detailed product features.
        - **Medium knowledge**: Offer a blend of basic and intricate features.
        - **Low knowledge**: Start with rudimentary features, progressing to more advanced ones.
    - **Customization by Familiarity**:
      - **High**: Present product features in detail.
      - **Low**: Introduce primary features with occasional in-depth descriptions.
    - **Scope**: Design the API to accommodate a broad spectrum of questions, focusing more on depth than brevity (examples include aspects like performance and aesthetics).
    - **Flow of Questions**: At the culmination of the questionnaire, and before concluding, prompt: "[qtype: MULTIPLE_CHOICE] Are there any additional features or details you'd like to specify?"
    - **Additional Suggestions**: All supplementary recommendations or suggestions should align with the Qtype format.
    - **Summary Output:
      - ** Generate a concise and straightforward summary of user preferences with the prefix "[qtype: SUMMARY]".
      - ** The summary should solely depict user preferences. 
      - ** Do not include any recommendations, actionable steps, or inferences about their familiarity level.
    - **Rationale**: Aim to provide a lucid and succinct depiction of user preferences, facilitating seamless integration with external platforms or tools.`,
    log_level: process.env.LOG_LEVEL || "debug",
    mongo_uri: process.env.MONGO_URI || "***",
    secret_key:process.env.SECRET_KEY||""
}