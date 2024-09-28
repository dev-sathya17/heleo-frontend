//import java.util.Scanner;
//
//public class MaximumArrayWithKWindow {
//    public static void main(String[] args) {
//        Scanner scannerObject = new Scanner(System.in);
//        int n = scannerObject.nextInt();
//        int[] arr = new int[n];
//        for(int i = 0 ; i < n ; i++)
//            arr[i] = scannerObject.nextInt();
//        int k = scannerObject.nextInt();
//        System.out.println(maxSumSubArray(n, k, arr));
//        System.out.println(SlidingWindow(n, k, arr));
//        scannerObject.close();
//    }
//
//    public static int maxSumSubArray(int n, int k, int[] arr) {
//        int maxSum = Integer.MIN_VALUE;
//        for(int i = 0 ; i < (n - k) ; i++) {
//            int j = i, count = 1;
//            int currentSum = 0;
//            while(count <= k) {
//                currentSum += arr[j];
//                count++;
//                j++;
//            }
//            maxSum = Math.max(currentSum, maxSum);
//        }
//        return maxSum;
//    }
//}
