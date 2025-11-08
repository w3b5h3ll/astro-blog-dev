import { useState, useEffect } from "react";

import CryptoJS from "crypto-js";
const { AES, enc } = CryptoJS;

export default function PasswordPrompt({ encryptedContent, correctPassword }) {
    const [input, setInput] = useState("");
    const [decryptedContent, setDecryptedContent] = useState(null);
    const [error, setError] = useState(false);

    // 使用sessionStorage来记住已解密的内容

    const sessionKey = `astro_decrypted_${encryptedContent.slice(0, 10)}`;

    const tryDecrypt = (password) => {
        try {
            const bytes = AES.decrypt(encryptedContent, password);
            const decrypted = bytes.toString(enc.Utf8);
            if (decrypted) {
                setDecryptedContent(decrypted);
                sessionStorage.setItem(sessionKey, decrypted);
                setError(false);

                return true;
            }
        } catch (e) {
            // 解密失败
        }
        setError(true);
        sessionStorage.removeItem(sessionKey);
        return false;
    };

    useEffect(() => {
        if (sessionStorage.getItem(sessionKey)) {
            tryDecrypt(correctPassword);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        tryDecrypt(input);
    };

    // 如果解密后的HTML存在，就显示它
    if (decryptedContent) {
        return (
            <article
                class='post-content'
                dangerouslySetInnerHTML={{ __html: decryptedContent }}
            />
        );
        // return <div dangerouslySetInnerHTML={{ __html: decryptedContent }} />;
    }

    // 否则，显示密码输入表单
    return (
        <div className='prompt-text'>
            <p>This post is password-protected.</p>
            <form onSubmit={handleSubmit}>
                <input
                    type='password'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    autoFocus
                    placeholder='Enter password...'
                />
                <button type='submit'>Unlock</button>
            </form>
            {error && <p className='error-message'>Incorrect password!</p>}
        </div>
    );
}
