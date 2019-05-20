const MyToken = artifacts.require("MyToken");

contract("MyToken", accounts => {
  it("seharusnya taruh 10000 koin di akun pertama", async () => {
    let instance = await MyToken.deployed();
    let balance = await instance.balanceOf(accounts[0]);
    assert.equal(balance.toNumber(), 10000, "10000 tidak ada di akun pertama");
  });

  it("seharusnya dapat hasil yang sesuai dari metode getString", async () => {
    let instance = await MyToken.deployed();
    let string = await instance.getString();
    assert.equal(string, "Hello World", "Seharusnya mengembalikan 'Hello World'");
  });

  it("seharusnya kirim koin dengan benar", async () => {
    const account1 = accounts[0];
    const account2 = accounts[1];

    let token = await MyToken.deployed();

    let account1_balance_pre = await token.balanceOf(account1);
    let account2_balance_pre = await token.balanceOf(account2);

    const amount = 20;
    await token.transfer(account2, amount, { from: account1 });

    let account1_balance_post = await token.balanceOf(account1);
    let account2_balance_post = await token.balanceOf(account2);

    assert.equal(account1_balance_post.toNumber(), account1_balance_pre.toNumber() - amount, "Jumlah koin berhasil dikurangkan dari akun 1.");
    assert.equal(account2_balance_post.toNumber(), account2_balance_pre.toNumber() + amount, "Jumlah koin berhasil ditambahkan ke akun 2.");
  
  });
});
