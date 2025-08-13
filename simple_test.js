// PromptMax Simple Functional Test
const http = require('http');

console.log('🚀 Starting PromptMax E2E Functional Test...');

const testRequest = http.get('http://172.171.199.162:3000', (res) => {
  console.log('✓ App responds with status:', res.statusCode);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    // Test key elements
    const tests = [
      { name: 'PromptMax Title', test: data.includes('PromptMax') },
      { name: 'Copy Button', test: data.includes('Copy') },
      { name: 'Templates', test: data.includes('template') },
      { name: 'JSON Generation', test: data.includes('Generate JSON') },
      { name: 'copyToClipboard Function', test: data.includes('copyToClipboard') },
      { name: 'Lucide Icons', test: data.includes('lucide') },
      { name: 'Tailwind CSS', test: data.includes('bg-gradient') },
      { name: 'History Feature', test: data.includes('history') }
    ];
    
    console.log('\n📋 Test Results:');
    tests.forEach(test => {
      console.log(test.test ? `✓ ${test.name}` : `✗ ${test.name}`);
    });
    
    const passedTests = tests.filter(t => t.test).length;
    console.log(`\n📊 Summary: ${passedTests}/${tests.length} tests passed`);
    
    if (passedTests === tests.length) {
      console.log('🎉 All core functionality tests PASSED!');
      console.log('🌐 App is ready at: http://172.171.199.162:3000');
    } else {
      console.log('⚠️  Some tests failed - check implementation');
    }
  });
});

testRequest.on('error', (err) => {
  console.log('✗ Connection failed:', err.message);
});
