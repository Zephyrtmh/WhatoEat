import React from 'react';

function Shop(props) {
    
    return (
        <div className="shopgrid">
            <header className="shopName">
                <p>logo</p>
                <h2>{props.name}</h2>
            </header>
            <body className="shopDescription">
                <p>Ante metus dictum at tempor commodo ullamcorper a lacus vestibulum. Vitae semper quis lectus nulla at volutpat diam ut venenatis. Euismod in pellentesque massa placerat. Turpis massa tincidunt dui ut ornare lectus. Ac tortor vitae purus faucibus. Maecenas ultricies mi eget mauris pharetra. Adipiscing elit pellentesque habitant morbi tristique senectus et.</p>
            </body>
        </div>
    );
}

export default Shop;