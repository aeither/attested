async function main() {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: '{"text":"hello"}'
    };

    fetch('http://localhost:3000/api/generate-quiz', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

main();
