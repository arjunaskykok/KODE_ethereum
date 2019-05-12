const MyToken = artifacts.require("MyToken");

contract("MyToken", accounts => {
  it("seharusnya taruh 10000 koin di akun pertama", () => {
    MyToken.deployed()
      .then(instance => instance.balanceOf(accounts[0]))
      .then(balance => {
        assert.equal(balance.toNumber(), 10000, "10000 tidak ada di akun pertama");
      });
  });

  it("seharusnya dapat hasil yang sesuai dari metode getString", () => {
    MyToken.deployed()
      .then(instance => instance.getString())
      .then(result => {
        assert.equal(result, "Hello World", "Seharusnya mengembalikan 'Hello World'");
      });
  });

  it("seharusnya kirim koin dengan benar", () => {
    let token;

    const account1 = accounts[0];
    const account2 = accounts[1];

    let account1_balance_pre;
    let account2_balance_pre;
    let account1_balance_post;
    let account2_balance_post;

    const amount = 20;

    MyToken.deployed()
      .then(instance => {
        token = instance;
        return token.balanceOf(account1);
      })
      .then(balance => {
        account1_balance_pre = balance.toNumber();
        return token.balanceOf(account2);
      })
      .then(balance => {
        account2_balance_pre = balance.toNumber();
        return token.transfer(account2, amount, { from: account1 });
      })
      .then(() => token.balanceOf(account1))
      .then(balance => {
        account1_balance_pre = balance.toNumber();
        return token.balanceOf(account2);
      })
      .then(balance => {
        account2_balance_pre = balance.toNumber();

        assert.equal(account1_balance_post, account1_balance_pre - amount, "Jumlah koin berhasil dikurangkan dari akun 1.");
        assert.equal(account2_balance_post, account2_balance_pre + amount, "Jumlah koin berhasil ditambahkan ke akun 2.");
      });
  });
});
