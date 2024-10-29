
document.addEventListener("DOMContentLoaded", () => {
    loadBooks();
    populateGenres();
});

function showDashboard() {
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("log").style.display = "none";
    document.getElementById("filters").style.display = "none";
    fadeIn(document.getElementById("dashboard"));
}

function showLog() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("log").style.display = "block";
    document.getElementById("filters").style.display = "none";
    fadeIn(document.getElementById("log"));
}

function showFilters() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("log").style.display = "none";
    document.getElementById("filters").style.display = "block";
    fadeIn(document.getElementById("filters"));
}

const books = [
    { title: "Book 1", genre: "Fiction", author: "Author 1", status: "read", rating: 4, favorite: true, review: "Loved it!", backgroundImage: "url('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiRrva7WlZ-6XyxRi95yDisqsx0kMrELdEeJAtWMDUkLmU5jZTDH43pFBpy_4p1nOWcCHpaBxEwGhi_HK3B1Lgt8IhCqlQORj8XnbhtUpsLiTMkfqHRnzwUfIK775o13mjhl69p-kyXXt8/w680/Pride-and-Prejudice-by-Jane-Austen.jpg')" },
    { title: "Book 2", genre: "Science", author: "Author 2", status: "reading", rating: 3, favorite: false, review: "", backgroundImage: "url('https://m.media-amazon.com/images/I/91CqNElQaKL._AC_UF1000,1000_QL80_.jpg')" },
    { title: "Book 3", genre: "Adventure", author: "Author 3", status: "wishlist", rating: 5, favorite: false, review: "", backgroundImage: "url('https://m.media-amazon.com/images/I/71XLiqZnMLL._AC_UF1000,1000_QL80_.jpg')" }
];


function loadBooks() {
    const bookEntries = document.getElementById("bookEntries");
    bookEntries.innerHTML = books.map((book, index) => `
        <div class="book-card" style="background-image: ${book.backgroundImage}">
            <div class="book-card-content">
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Genre: ${book.genre}</p>
                <p>Status: ${book.status}</p>
                <div class="rating-stars">
                    ${[1, 2, 3, 4, 5].map(i => `
                        <span class="star ${i <= book.rating ? 'filled' : ''}" onclick="setRating(${index}, ${i})">&#9733;</span>
                    `).join('')}
                </div>
                <div class="actions">
                    <span onclick="toggleFavorite(${index})" class="heart ${book.favorite ? 'favorited' : ''}">&#9829;</span>
                    <button onclick="promptReview(${index})">Add Review</button>
                </div>
            </div>
        </div>
    `).join("");
}



function toggleFavorite(index) {
    books[index].favorite = !books[index].favorite;
    loadBooks();
}

function setRating(index, rating) {
    books[index].rating = rating;
    loadBooks();
}

function promptReview(index) {
    const review = prompt("Enter your review:");
    if (review !== null) {
        books[index].review = review;
        alert("Review added!");
    }
}

// Load books when the page loads
document.addEventListener("DOMContentLoaded", loadBooks);





function applyFilters() {
    const search = document.getElementById("searchInput").value.toLowerCase();
    const genre = document.getElementById("genreFilter").value;
    const status = document.getElementById("statusFilter").value;

    const filteredBooks = books.filter(book => {
        return (book.title.toLowerCase().includes(search) || book.author.toLowerCase().includes(search))
            && (genre === "" || book.genre === genre)
            && (status === "" || book.status === status);
    });

    document.getElementById("bookEntries").innerHTML = filteredBooks.map(book => `
        <div class="book-entry">
            <h3>${book.title} by ${book.author}</h3>
            <p>Genre: ${book.genre}</p>
            <p>Status: ${book.status}</p>
            <p>Rating: ${book.rating} / 5</p>
            <button onclick="toggleFavorite('${book.title}')">${book.favorite ? "Unfavorite" : "Favorite"}</button>
        </div>
    `).join("");
}

function fadeIn(element) {
    element.style.opacity = 0;
    let opacity = 0;
    const interval = setInterval(() => {
        opacity += 0.1;
        element.style.opacity = opacity;
        if (opacity >= 1) clearInterval(interval);
    }, 30);
}

function populateGenres() {
    const genres = [...new Set(books.map(book => book.genre))];
    const genreFilter = document.getElementById("genreFilter");
    genres.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadBooks();
    populateGenres();
    updateDailyProgress(60); // Example: starts at 60%
    displayReadingTimeChart();
});

// Sample reading time data for the line chart (replace with dynamic data if available)
const readingTimeData = [30, 45, 60, 50, 70, 80, 95]; // Time spent each day in minutes (replace with real data)

// Update the daily reading progress bar (takes percentage as parameter)
function updateDailyProgress(percentage) {
    const progressBar = document.getElementById("dailyProgressBar");
    const progressLabel = document.getElementById("progressLabel");

    if (percentage > 100) percentage = 100; // Cap at 100%
    progressBar.style.width = percentage + "%";
    progressLabel.textContent = percentage + "%";
}

// Display the reading time trend in a line chart
function displayReadingTimeChart() {
    const ctx = document.getElementById("timeChart").getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], // Days of the week
            datasets: [{
                label: "Reading Time (minutes)",
                data: readingTimeData,
                borderColor: "#4caf50",
                backgroundColor: "rgba(76, 175, 80, 0.2)",
                fill: true,
                tension: 0.3,
                pointBackgroundColor: "#388e3c",
                pointBorderColor: "#388e3c",
                pointHoverBackgroundColor: "#2e7d32"
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: "Minutes" }
                },
                x: {
                    title: { display: true, text: "Days" }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.raw} minutes`;
                        }
                    }
                }
            }
        }
    });
}
function toggleFavorite(index) {
    books[index].favorite = !books[index].favorite;
    loadBooks(); // Refresh to update the heart icon state
}
